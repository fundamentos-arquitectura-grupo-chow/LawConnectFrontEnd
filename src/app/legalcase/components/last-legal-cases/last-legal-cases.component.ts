import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { LegalCaseService } from '../../services/legal-case.service';
import { ConsultationService } from '../../../consultation/services/consultation.service';
import { LegalCase } from '../../model/legal-case';
import { Consultation } from '../../../consultation/model/consultation';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-last-legal-cases',
  templateUrl: './last-legal-cases.component.html',
  styleUrls: ['./last-legal-cases.component.css']
})
export class LastLegalCasesComponent implements OnInit, OnChanges {
  @Input() lawyerId: number = 0;
  legalCases: LegalCase[] = [];

  constructor(
    private legalCaseService: LegalCaseService,
    private consultationService: ConsultationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.lawyerId > 0) {
      this.loadLegalCases();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lawyerId'] && changes['lawyerId'].currentValue !== changes['lawyerId'].previousValue && this.lawyerId > 0) {
      this.loadLegalCases();
    }
  }

  loadLegalCases(): void {
    this.legalCases = [];
    this.consultationService.getAllConsultationsByLawyerId(this.lawyerId).subscribe(consultations => {
      const approvedConsultations = consultations.filter(consultation => consultation.applicationStatus === 'APPROVED');

      if (approvedConsultations.length === 0) {
        return;
      }

      const legalCaseObservables = approvedConsultations.map(consultation =>
        this.legalCaseService.getLegalCaseByConsultationId(consultation.id)
      );

      forkJoin(legalCaseObservables).subscribe(legalCases => {
        const uniqueCases = legalCases.filter((legalCase, index, self) =>
          index === self.findIndex(c => c.id === legalCase.id)
        );

        // Ordenar por ID descendente y tomar solo los últimos 5
        this.legalCases = uniqueCases
          .sort((a, b) => b.id - a.id)
          .slice(0, 5);
      });
    });
  }

  viewLegalCase(consultationId: number): void {
    this.router.navigate(['/view-legal-case-lawyer', consultationId]);
  }

  getStatusClass(status: string): string {
    return status === 'CLOSED' ? 'status-closed' : 'status-open';
  }

  getStatusText(status: string): string {
    return status === 'CLOSED' ? 'CERRADO' : 'ACTIVO';
  }
}
