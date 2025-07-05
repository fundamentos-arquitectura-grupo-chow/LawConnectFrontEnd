import { Component, OnInit } from '@angular/core';
import { Client } from '../../model/client';
import { Lawyer } from '../../model/lawyer';
import { ClientService } from '../../services/client.service';
import { LawyerService } from '../../services/lawyer.service';
import { AuthenticationService } from '../../../iam/services/authentication.service';
import { ConsultationService } from '../../../consultation/services/consultation.service';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.css']
})
export class CurrentUserComponent implements OnInit {
  name: string = '';
  url_image: string = '';
  userRole: string = '';
  email: string = '';
  specialization: string = '';
  phone: string = '';
  currentUserId: number = 0;

  constructor(
    private clientService: ClientService,
    private lawyerService: LawyerService,
    private authService: AuthenticationService,
    private consultationService: ConsultationService
  ) {}

  ngOnInit(): void {
    this.authService.currentUserId.subscribe((userId: number) => {
      this.currentUserId = userId;
      this.authService.currentUserRole.subscribe((role: string) => {
        const match = role.match(/name=(\w+)/);
        if (match) {
          this.userRole = match[1];
        }
        this.loadUserData();
      });
    });
  }

  private loadUserData(): void {
    if (this.userRole === 'CLIENT') {
      this.clientService.getClientById(this.currentUserId).subscribe((client: Client) => {
        this.name = `${client.profile.name.firstName} ${client.profile.name.lastName}`;
        this.url_image = client.profile.image_url;
        this.email = client.profile.email.address;
        this.phone = client.profile.phoneNumber;
      });
    } else if (this.userRole === 'LAWYER') {
      this.lawyerService.getLawyerById(this.currentUserId).subscribe((lawyer: Lawyer) => {
        this.name = `${lawyer.profile.name.firstName} ${lawyer.profile.name.lastName}`;
        this.url_image = lawyer.profile.image_url;
        this.email = lawyer.profile.email.address;
        this.phone = lawyer.profile.phoneNumber;
        this.specialization = lawyer.lawyerTypes.length > 0 ? lawyer.lawyerTypes[0] : 'General';
      });
    }
  }

  getRoleDisplayName(): string {
    return this.userRole === 'LAWYER' ? 'Abogado' : 'Cliente';
  }
}
