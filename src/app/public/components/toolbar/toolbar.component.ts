import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../iam/services/authentication.service';
import { AddTypeLawyerComponent } from "../../../profile/components/add-type-lawyer/add-type-lawyer.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  userRole: string = '';
  lawyerId: number = 0;

  constructor(
    private dialog: MatDialog,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.authService.currentUserRole.subscribe(role => this.userRole = role);
  }

  ngOnInit() {
    this.authService.currentUserRole.subscribe((role) => {
      const match = role.match(/name=(\w+)/);
      if (match) {
        this.userRole = match[1];
      }
    });
  }

  navigateToHome(): void {
    switch (this.userRole) {
      case 'CLIENT':
        this.router.navigate(['/home-client']);
        break;
      case 'LAWYER':
        this.router.navigate(['/home-lawyer']);
        break;
      default:
        this.router.navigate(['/']);
        break;
    }
  }

  openAddSpecialtyDialog(): void {
    this.authService.currentUserId.subscribe((id) => {
      this.lawyerId = id;
    });
    const aux = this.lawyerId;
    this.dialog.open(AddTypeLawyerComponent, {
      width: '400px',
      data: { aux }
    });
  }
}
