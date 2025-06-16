import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LegalCaseService } from '../../services/legal-case.service';
import { LegalCase } from '../../model/legal-case';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmCloseCaseComponent } from '../../components/confirm-close-case/confirm-close-case.component';
import {Consultation} from "../../../consultation/model/consultation";
import {ConsultationService} from "../../../consultation/services/consultation.service";

@Component({
  selector: 'app-view-legal-case-client',
  templateUrl: './view-legal-case-client.component.html',
  styleUrls: ['./view-legal-case-client.component.css']
})
export class ViewLegalCaseClientComponent implements OnInit {
  legalCase: LegalCase | null = null;
  showPopup = false;
  consultation: Consultation | null = null;

  constructor(
    private route: ActivatedRoute,
    private legalCaseService: LegalCaseService,
    private consultationService: ConsultationService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const consultationId = +params['consultationId'];
      this.loadLegalCase(consultationId);
    });
  }



  loadLegalCase(consultationId: number) {
    this.legalCaseService.getLegalCaseByConsultationId(consultationId).subscribe((data) => {
      this.legalCase = data;

      // Obtener el objeto Consultation completo
      this.consultationService.getConsultationById(consultationId).subscribe(
        (consultation) => {
          this.consultation = consultation;
        }
      );
    });
  }

  goToDocuments() {
    if (this.consultation) {
      console.log('Consultation:', this.legalCase?.id);
      this.router.navigate(['/documents', this.legalCase?.id]);
    }
  }

  goToPayments() {
    if (this.consultation) {
      this.router.navigate(['/payments', this.consultation.id]);
    }
  }

  goToChatRoom() {
    if (this.consultation) {
      this.router.navigate(['/chat-room', this.consultation.id]);
    }
  }

  goToVideoCall() {
    if (this.consultation) {
      this.router.navigate(['/video-call', this.consultation.id]);
    }
  }

  goToAppointments() {
    if (this.consultation) {
      this.router.navigate(['/appointments', this.consultation.id]);
    }
  }

  openCloseCasePopup(action: 'close') {
    const dialogRef = this.dialog.open(ConfirmCloseCaseComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'close') {
        this.showPopup = true;
      }
    });
  }
}
