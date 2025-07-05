import { Component, Input, OnInit } from '@angular/core';
import { ChatRoomService } from '../../services/chat-room.service';
import { MessagesService } from '../../services/messages.service';
import { ChatRoomResource } from '../../model/chat-room';
import { MessageResource } from '../../model/message';
import { AddMessageByChatRoomIdResource } from '../../model/add-message';
import { Consultation } from '../../../consultation/model/consultation';
import { AuthenticationService } from '../../../iam/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultationService } from '../../../consultation/services/consultation.service';
import { LawyerService } from "../../../profile/services/lawyer.service";
import { ClientService } from "../../../profile/services/client.service";

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.css']
})
export class ChatroomComponent implements OnInit {
  consultation: Consultation | null = null;
  chatRoom: ChatRoomResource | null = null;
  messages: MessageResource[] = [];
  newMessage: string = '';
  currentRole: string = '';
  chatPartnerName: string = '';

  constructor(
    private chatRoomService: ChatRoomService,
    private messagesService: MessagesService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    public consultationService: ConsultationService,
    private lawyerService: LawyerService,
    private clientService: ClientService
) {}

  ngOnInit() {
    this.authService.currentUserRole.subscribe(role => {
      this.currentRole = role;
      console.log('Role:', role);
    });
    this.route.params.subscribe(params => {
      const consultationId = +params['consultationId'];
      this.loadConsultation(consultationId);
    });
  }

  loadConsultation(consultationId: number) {
    this.consultationService.getConsultationById(consultationId).subscribe(
      (consultation) => {
        this.consultation = consultation;
        this.loadChatRoom();

        // Check current user role to determine which name to display
        const isLawyer = this.currentRole === '[Role(id=1, name=LAWYER)]';

        if (isLawyer && consultation.clientId) {
          // If current user is a lawyer, show the client's name
          this.clientService.getClientById(consultation.clientId).subscribe(
            (client) => {
              this.chatPartnerName = client.profile.name.fullName;
            },
            (error) => {
              console.error('Error al cargar información del cliente:', error);
              this.chatPartnerName = 'Cliente #' + consultation.clientId;
            }
          );
        } else if (!isLawyer && consultation.lawyerId) {
          // If current user is a client, show the lawyer's name (current behavior)
          this.lawyerService.getLawyerById(consultation.lawyerId).subscribe(
            (lawyer) => {
              this.chatPartnerName = lawyer.profile.name.fullName;
            },
            (error) => {
              console.error('Error al cargar información del abogado:', error);
              this.chatPartnerName = 'Abogado #' + consultation.lawyerId;
            }
          );
        }
      },
      (error) => {
        console.error('Error loading consultation:', error);
      }
    );
  }

  loadChatRoom() {
    if (this.consultation) {
      this.chatRoomService.getChatRoomByConsultationId(this.consultation.id).subscribe(
        (chatRoom) => {
          this.chatRoom = chatRoom;
          this.messages = chatRoom.messages;
        },
        (error) => {
          console.error('Error loading chat room:', error);
        }
      );
    }
  }

  sendMessage() {
    if (this.newMessage.trim() !== '' && this.chatRoom && this.consultation) {
      const sender = this.currentRole === '[Role(id=1, name=LAWYER)]' ? 2 : 1;
      const messageResource = new AddMessageByChatRoomIdResource(
        this.chatRoom.id,
        this.newMessage,
        sender
      );
      this.messagesService.addMessageByChatRoomId(messageResource).subscribe(
        () => {
          this.loadChatRoom(); // Reload chat room to update messages
          this.newMessage = '';
        },
        (error) => {
          console.error('Error sending message:', error)
          this.loadChatRoom(); // Reload chat room to update messages
          this.newMessage = '';
        }
      );
    }
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      // Crear una URL para previsualizar la imagen si es necesario
      const fileUrl = URL.createObjectURL(file);

      // Para archivos de imagen
      if (file.type.startsWith('image/')) {
        // Agregar mensaje con contenido enriquecido
        this.newMessage = `[Imagen adjunta: ${file.name}]`;
      } else {
        // Para otros tipos de archivos
        this.newMessage = `[Archivo adjunto: ${file.name}]`;
      }

      // Enviar mensaje con el archivo
      this.sendMessage();
    }
  }

  isSentMessage(senderType: String): boolean {
    console.log('Sender type:', this.currentRole);
    const sender = this.currentRole === '[Role(id=1, name=LAWYER)]' ? "LAWYER" : "CLIENT";
    console.log('Sender:', senderType);
    return senderType === sender;
  }
}
