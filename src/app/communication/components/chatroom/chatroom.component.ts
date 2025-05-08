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

  constructor(
    private chatRoomService: ChatRoomService,
    private messagesService: MessagesService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    public consultationService: ConsultationService
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
      const fileMessage = `Archivo subido: ${file.name}`;
      this.messages.push({ text: fileMessage, type: 'sent', isFile: true } as unknown as MessageResource);
    }
  }
  isSentMessage(senderType: String): boolean {
    console.log('Sender type:', this.currentRole);
    const sender = this.currentRole === '[Role(id=1, name=LAWYER)]' ? "LAWYER" : "CLIENT";
    console.log('Sender:', senderType);
    return senderType === sender;
  }
}
