import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../../iam/services/authentication.service";
import { ConsultationService } from "../../../consultation/services/consultation.service";
import { LegalCaseService } from "../../../legalcase/services/legal-case.service";

@Component({
  selector: 'app-home-client',
  templateUrl: './home-client.component.html',
  styleUrl: './home-client.component.css'
})
export class HomeClientComponent implements OnInit {
  currentId: number = 0;
  activeCasesCount: number = 0;
  pendingConsultationsCount: number = 0;
  closedCasesCount: number = 0;

  constructor(
    private authService: AuthenticationService,
    private consultationService: ConsultationService,
    private legalCaseService: LegalCaseService
  ) {}

  ngOnInit() {
    this.authService.currentUserId.subscribe(
      (id) => {
        this.currentId = id;
        this.loadStatistics();
      }
    );
  }

  signOut(): void {
    this.authService.signOut();
  }

  private loadStatistics(): void {
    this.loadActiveCasesCount();
    this.loadPendingConsultationsCount();
    this.loadClosedCasesCount();
  }

  private loadActiveCasesCount(): void {
    this.consultationService.getAllConsultationsByClientId(this.currentId).subscribe(consultations => {
      const approvedConsultations = consultations.filter(consultation => consultation.applicationStatus === 'APPROVED');
      let activeCases = 0;

      if (approvedConsultations.length === 0) {
        this.activeCasesCount = 0;
        return;
      }

      approvedConsultations.forEach(consultation => {
        this.legalCaseService.getLegalCaseByConsultationId(consultation.id).subscribe(legalCase => {
          if (legalCase.status !== 'CLOSED') {
            activeCases++;
          }
          this.activeCasesCount = activeCases;
        });
      });
    });
  }

  private loadPendingConsultationsCount(): void {
    this.consultationService.getAllConsultationsByClientId(this.currentId).subscribe(consultations => {
      this.pendingConsultationsCount = consultations.filter(consultation => consultation.applicationStatus === 'PENDING').length;
    });
  }

  private loadClosedCasesCount(): void {
    this.consultationService.getAllConsultationsByClientId(this.currentId).subscribe(consultations => {
      const approvedConsultations = consultations.filter(consultation => consultation.applicationStatus === 'APPROVED');
      let closedCases = 0;

      if (approvedConsultations.length === 0) {
        this.closedCasesCount = 0;
        return;
      }

      approvedConsultations.forEach(consultation => {
        this.legalCaseService.getLegalCaseByConsultationId(consultation.id).subscribe(legalCase => {
          if (legalCase.status === 'CLOSED') {
            closedCases++;
          }
          this.closedCasesCount = closedCases;
        });
      });
    });
  }
}
