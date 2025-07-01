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
  filteredLegalCases: LegalCase[] = [];
  paginatedLegalCases: LegalCase[] = [];
  filterType: string = 'ALL';


  currentPage: number = 0;
  pageSize: number = 6; //
  totalPages: number = 0;

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
    this.legalCases = [];

    let loadedCases = 0;
    approvedConsultations.forEach(consultation => {
      this.legalCaseService.getLegalCaseByConsultationId(consultation.id).subscribe(legalCase => {
        this.legalCases.push(legalCase);
        loadedCases++;

        if (loadedCases === approvedConsultations.length) {
          this.applyFilter();
        }
      });
    });
  }

  viewLegalCase(consultationId: number): void {
    if (this.userRole === 'LAWYER') {
      this.router.navigate(['/view-legal-case-lawyer', consultationId]);
    } else if (this.userRole === 'CLIENT') {
      this.router.navigate(['/view-legal-case-client', consultationId]);
    }
  }

  applyFilter(): void {
    if (this.filterType === 'ALL') {
      this.filteredLegalCases = [...this.legalCases];
    } else if (this.filterType === 'OPEN') {
      this.filteredLegalCases = this.legalCases.filter(legalCase => legalCase.status !== 'CLOSED');
    } else if (this.filterType === 'CLOSED') {
      this.filteredLegalCases = this.legalCases.filter(legalCase => legalCase.status === 'CLOSED');
    }

    this.updatePagination();
  }

  changeFilter(filterType: string): void {
    this.filterType = filterType;
    this.currentPage = 0;
    this.applyFilter();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredLegalCases.length / this.pageSize);
    this.updatePaginatedCases();
  }

  updatePaginatedCases(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedLegalCases = this.filteredLegalCases.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.updatePaginatedCases();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.updatePaginatedCases();
    }
  }
}
