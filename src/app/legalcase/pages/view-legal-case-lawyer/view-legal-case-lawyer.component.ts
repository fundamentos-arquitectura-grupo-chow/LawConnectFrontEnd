import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LegalCaseService } from '../../services/legal-case.service';
import { LegalCase } from '../../model/legal-case';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmCloseCaseComponent } from '../../components/confirm-close-case/confirm-close-case.component';
import {Consultation} from "../../../consultation/model/consultation";

@Component({
  selector: 'app-view-legal-case-lawyer',
  templateUrl: './view-legal-case-lawyer.component.html',
  styleUrls: ['./view-legal-case-lawyer.component.css']
})
export class ViewLegalCaseLawyerComponent implements OnInit {
  legalCase: LegalCase | null = null;
  showPopup = false;
  consultation: Consultation | null = null;
  isCaseClosed = false;

  constructor(
    private route: ActivatedRoute,
    private legalCaseService: LegalCaseService,
    private router: Router,
    private dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const consultationId = +params['consultationId'];
      this.loadLegalCase(consultationId);
    });
  }

  loadLegalCase(consultationId: number) {
    this.legalCaseService.getLegalCaseByConsultationId(consultationId).subscribe((data) => {
      this.legalCase = data;
      this.consultation = data.consultationId;

      // Check if case is closed
      this.isCaseClosed = this.legalCase.status === 'CLOSED';

      // If case is closed, show a message
      if (this.isCaseClosed) {
        alert('Este caso ha sido cerrado y está en modo de solo lectura.');
      }
    });
  }

  goToDocuments() {
    if (this.consultation) {
      console.log('Consultation:', this.legalCase?.id);
      this.router.navigate(['/documents', this.legalCase?.id]);
    }
  }

  goToPayments() {
    if (this.legalCase?.consultationId) {
      this.router.navigate(['/payments', this.legalCase.consultationId]);
    }
  }

  goToChatRoom() {
    if (this.legalCase?.consultationId) {
      this.router.navigate(['/chat-room', this.legalCase.consultationId]);
    }
  }

  goToVideoCall() {
    if (this.legalCase?.consultationId) {
      this.router.navigate(['/video-call', this.legalCase.consultationId]);
    }
  }

  goToAppointments() {
    if (this.legalCase?.consultationId) {
      this.router.navigate(['/appointments', this.legalCase.consultationId]);
    }
  }

  openCloseCasePopup(action: 'close') {
    const dialogRef = this.dialog.open(ConfirmCloseCaseComponent);

    dialogRef.afterClosed().subscribe((result) => {
      // The dialog returns 'confirm' not 'close'
      if (result === 'confirm' && this.legalCase?.id) {
        // Show loading indicator
        this.showPopup = true;

        // Call the service method to actually close the case
        this.legalCaseService.closeLegalCase(this.legalCase.id).subscribe(
          () => {
            // Update local state
            if (this.legalCase) {
              this.legalCase.status = 'CLOSED';
            }

            // Navigate to notifications (as your dialog component already does)
            this.router.navigate(['/notifications']);
          },
          (error) => {
            console.error('Error closing case:', error);
            this.showPopup = false;
            // Show error message to user
            alert('Error al cerrar el caso. Por favor intente nuevamente.');
          }
        );
      }
    });
  }
}


