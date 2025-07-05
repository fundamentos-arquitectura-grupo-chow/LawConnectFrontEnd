import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../../iam/services/authentication.service";
import {ConsultationService} from "../../../consultation/services/consultation.service";
import {LegalCaseService} from "../../../legalcase/services/legal-case.service";

@Component({
  selector: 'app-home-lawyer',
  templateUrl: './home-lawyer.component.html',
  styleUrl: './home-lawyer.component.css'
})
export class HomeLawyerComponent implements OnInit {
  currentId: number = 0;
  activeCasesCount: number = 0;
  pendingConsultationsCount: number = 0;

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

  private loadStatistics(): void {
    this.loadActiveCasesCount();
    this.loadPendingConsultationsCount();
  }

  private loadActiveCasesCount(): void {
    this.consultationService.getAllConsultationsByLawyerId(this.currentId).subscribe(consultations => {
      const approvedConsultations = consultations.filter(consultation => consultation.applicationStatus === 'APPROVED');
      let activeCases = 0;

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
    this.consultationService.getAllConsultationsByLawyerId(this.currentId).subscribe(consultations => {
      this.pendingConsultationsCount = consultations.filter(consultation => consultation.applicationStatus === 'PENDING').length;
    });
  }
}
