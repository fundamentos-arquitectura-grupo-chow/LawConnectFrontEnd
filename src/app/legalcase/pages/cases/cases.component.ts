import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../iam/services/authentication.service';

@Component({
  selector: 'app-cases',
  templateUrl: './cases.component.html',
  styleUrls: ['./cases.component.css']
})
export class CasesComponent implements OnInit {
  userId: number = 0;
  userRole: string = '';

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.authService.currentUserId.subscribe(id => this.userId = id);
    this.authService.currentUserRole.subscribe((role) => {
      const match = role.match(/name=(\w+)/);
      if (match) {
        this.userRole = match[1];
      }
    });
  }
}
