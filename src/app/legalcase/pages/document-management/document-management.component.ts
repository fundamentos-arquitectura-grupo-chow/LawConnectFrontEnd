import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddDocumentComponent } from '../../components/add-document/add-document.component';
import { AuthenticationService } from '../../../iam/services/authentication.service';

@Component({
  selector: 'app-document-management',
  templateUrl: './document-management.component.html',
  styleUrls: ['./document-management.component.css']
})
export class DocumentManagementComponent implements OnInit {
  legalCaseId!: number;
  currentUserRole: string = '';

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      this.legalCaseId = +params['legalCaseId'];
      console.log('Legal Case ID:', this.legalCaseId);
    });

    this.authService.currentUserRole.subscribe(role => {
      this.currentUserRole = role;
    });
  }

  openAddDocumentDialog() {
    const dialogRef = this.dialog.open(AddDocumentComponent, {
      width: '400px',
      data: { legalCaseId: this.legalCaseId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        // Handle the confirmation if needed
      }
    });
  }
}
