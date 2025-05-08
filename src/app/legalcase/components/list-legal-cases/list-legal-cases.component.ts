import { Component, Input, OnInit } from '@angular/core';
import { LegalCaseService } from '../../services/legal-case.service';
import { ConsultationService } from '../../../consultation/services/consultation.service';
import { LegalCase } from '../../model/legal-case';
import { Consultation } from '../../../consultation/model/consultation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-legal-cases',
  templateUrl: './list-legal-cases.component.html',
  styleUrls: ['./list-legal-cases.component.css']
})
export class ListLegalCasesComponent implements OnInit {
  @Input() userId: number = 0;
  @Input() userRole: string = '';
  legalCases: LegalCase[] = [];

  constructor(
    private legalCaseService: LegalCaseService,
    private consultationService: ConsultationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLegalCases();
  }

  loadLegalCases(): void {
    if (this.userRole === 'LAWYER') {
      this.consultationService.getAllConsultationsByLawyerId(this.userId).subscribe(consultations => {
        this.filterApprovedConsultations(consultations);
      });
    } else if (this.userRole === 'CLIENT') {
      this.consultationService.getAllConsultationsByClientId(this.userId).subscribe(consultations => {
        this.filterApprovedConsultations(consultations);
      });
    }
  }

  filterApprovedConsultations(consultations: Consultation[]): void {
    const approvedConsultations = consultations.filter(consultation => consultation.applicationStatus === 'APPROVED');
    approvedConsultations.forEach(consultation => {
      this.legalCaseService.getLegalCaseByConsultationId(consultation.id).subscribe(legalCase => {
        this.legalCases.push(legalCase);
      });
    });
  }

  viewLegalCase(consultationId: number): void {
    console.log('View legal case:', this.userRole);
    if (this.userRole === 'LAWYER') {
      this.router.navigate(['/view-legal-case-lawyer', consultationId]);
    } else if (this.userRole === 'CLIENT') {
      this.router.navigate(['/view-legal-case-client', consultationId]);
    }
  }
}
