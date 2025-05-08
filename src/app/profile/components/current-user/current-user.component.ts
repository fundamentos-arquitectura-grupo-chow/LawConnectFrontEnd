import { Component, OnInit } from '@angular/core';
import { Client } from '../../model/client';
import { Lawyer } from '../../model/lawyer';
import { ClientService } from '../../services/client.service';
import { LawyerService } from '../../services/lawyer.service';
import { AuthenticationService } from '../../../iam/services/authentication.service';

@Component({
  selector: 'app-current-user',
  templateUrl: './current-user.component.html',
  styleUrls: ['./current-user.component.css']
})
export class CurrentUserComponent implements OnInit {
  name: string = '';
  url_image: string = '';
  userRole: string = '';

  constructor(
    private clientService: ClientService,
    private lawyerService: LawyerService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authService.currentUserId.subscribe((userId: number) => {
      this.authService.currentUserRole.subscribe((role: string) => {
        const match = role.match(/name=(\w+)/);
        if (match) {
          this.userRole = match[1];
        }
        if (this.userRole == 'CLIENT') {
          this.clientService.getClientById(userId).subscribe((client: Client) => {
            this.name = `${client.profile.name.firstName} ${client.profile.name.lastName}`;
            console.log(this.name);
            this.url_image = client.profile.image_url;
            console.log(client);
          });
        } else if (this.userRole == 'LAWYER') {
          this.lawyerService.getLawyerById(userId).subscribe((lawyer: Lawyer) => {
            this.name = `${lawyer.profile.name.firstName} ${lawyer.profile.name.lastName}`;
            this.url_image = lawyer.profile.image_url;
            console.log(lawyer);
          });
        }
      });
    });
  }
}
