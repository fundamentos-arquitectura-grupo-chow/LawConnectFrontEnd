import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { AuthenticationService } from '../../../iam/services/authentication.service';
import { Notification } from '../../model/notification';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {

  notifications: Notification[] = [];
  caseCount = 0;

  constructor(
    private notificationService: NotificationService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authService.currentUserId.subscribe(clientId => {
      if (clientId) {
        this.notificationService.getAllNotificationsByClientId(clientId).subscribe(notifications => {
          this.notifications = notifications;
          this.caseCount = notifications.length;
        });
      }
    });
  }
}
