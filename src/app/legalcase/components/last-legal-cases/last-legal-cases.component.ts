import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { LegalCaseService } from '../../services/legal-case.service';
import { ConsultationService } from '../../../consultation/services/consultation.service';
import { LegalCase } from '../../model/legal-case';
import { Consultation } from '../../../consultation/model/consultation';

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
    private consultationService: ConsultationService
  ) {}

  ngOnInit(): void {
    // No llamar a loadLegalCases aquí
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['lawyerId'] && changes['lawyerId'].currentValue !== changes['lawyerId'].previousValue) {
      this.loadLegalCases();
    }
  }

  loadLegalCases(): void {
    this.legalCases = [];
    this.consultationService.getAllConsultationsByLawyerId(this.lawyerId).subscribe(consultations => {
      const approvedConsultations = consultations.filter(consultation => consultation.applicationStatus === 'APPROVED');
      const approvedConsultationIds = approvedConsultations.map(consultation => consultation.id).slice(0, 3);
      approvedConsultationIds.forEach(consultationId => {
        this.legalCaseService.getLegalCaseByConsultationId(consultationId).subscribe(legalCase => {
          if (!this.legalCases.some(existingCase => existingCase.id === legalCase.id)) {
            this.legalCases.push(legalCase);
          }
          console.log('Legal case:', legalCase);
        });
      });
    });
  }
}
