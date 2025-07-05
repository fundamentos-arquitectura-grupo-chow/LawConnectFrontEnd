import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { LegalCaseService } from '../../services/legal-case.service';
import { ConsultationService } from '../../../consultation/services/consultation.service';
import { LegalCase } from '../../model/legal-case';
import { Consultation } from '../../../consultation/model/consultation';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-last-legal-cases-client',
  templateUrl: './last-legal-cases-client.component.html',
  styleUrls: ['./last-legal-cases-client.component.css']
})
export class LastLegalCasesClientComponent implements OnInit, OnChanges {
  @Input() clientId: number = 0;
  legalCases: LegalCase[] = [];

  constructor(
    private legalCaseService: LegalCaseService,
    private consultationService: ConsultationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // No llamar aquí para evitar carga antes de recibir clientId
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientId'] && changes['clientId'].currentValue) {
      this.loadLegalCases();
    }
  }

  loadLegalCases(): void {
    this.legalCases = [];
    this.consultationService.getAllConsultationsByClientId(this.clientId).subscribe(consultations => {
      const approvedConsultations = consultations.filter(consultation => consultation.applicationStatus === 'APPROVED');

      if (approvedConsultations.length === 0) {
        return;
      }

      const legalCaseObservables = approvedConsultations.map(consultation =>
        this.legalCaseService.getLegalCaseByConsultationId(consultation.id)
      );

      forkJoin(legalCaseObservables).subscribe(legalCases => {
        const uniqueCases = legalCases.filter((legalCase, index, self) =>
          index === self.findIndex(t => t.id === legalCase.id)
        ).sort((a, b) => b.id - a.id).slice(0, 5); // Limitar a 5 casos

        this.legalCases = uniqueCases;
      });
    });
  }

  viewLegalCase(consultationId: number): void {
    this.router.navigate(['/view-legal-case-client', consultationId]);
  }

  getStatusClass(status: string): string {
    return status === 'CLOSED' ? 'status-closed' : 'status-open';
  }

  getStatusText(status: string): string {
    return status === 'CLOSED' ? 'CERRADO' : 'ACTIVO';
  }
}
