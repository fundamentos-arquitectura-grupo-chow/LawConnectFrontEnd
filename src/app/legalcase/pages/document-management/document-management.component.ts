import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddDocumentComponent } from '../../components/add-document/add-document.component';
import { AuthenticationService } from '../../../iam/services/authentication.service';
import { DocumentTableComponent } from "../../components/document-table/document-table.component";

@Component({
  selector: 'app-document-management',
  templateUrl: './document-management.component.html',
  styleUrls: ['./document-management.component.css']
})
export class DocumentManagementComponent implements OnInit {
  legalCaseId!: number;
  currentUserRole: string = '';

  // Propiedad calculada para simplificar la lógica
  get isLawyer(): boolean {
    return this.currentUserRole.includes('LAWYER');
  }

  @ViewChild(DocumentTableComponent) documentTableComponent!: DocumentTableComponent;

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.legalCaseId = +params['legalCaseId'];
      console.log('Legal Case ID:', this.legalCaseId);
    });

    this.authService.currentUserRole.subscribe(role => {
      this.currentUserRole = role;
    });
  }

  openAddDocumentDialog() {
    const dialogRef = this.dialog.open(AddDocumentComponent, {
      width: '500px',
      disableClose: true,
      data: {legalCaseId: this.legalCaseId}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm' && this.documentTableComponent) {
        this.documentTableComponent.loadDocuments();
      }
    });
  }
}
