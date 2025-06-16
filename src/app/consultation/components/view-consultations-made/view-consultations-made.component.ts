import { ActivatedRoute, Router } from '@angular/router';
import { ConsultationService } from '../../services/consultation.service';
import { AuthenticationService } from '../../../iam/services/authentication.service';
import { Consultation } from '../../model/consultation';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-consultations-made',
  templateUrl: './view-consultations-made.component.html',
  styleUrls: ['./view-consultations-made.component.css']
})
export class ViewConsultationsMadeComponent implements OnInit {
  consultations: Consultation[] = [];
  lawyerId: number = 0;
  clientId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private consultationService: ConsultationService,
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.lawyerId = +params['lawyerId'];
    });
    this.authService.currentUserId.subscribe(id => {
      this.clientId = id;
    });
    this.consultationService.getAllConsultationsByLawyerIdAndClientId(this.lawyerId, this.clientId)
      .subscribe(consultations => this.consultations = consultations);
  }

  viewLegalCase(consultationId: number): void {
    this.router.navigate(['/view-legal-case-client', consultationId]);
  }

  getStatusClass(status: string): string {
    switch(status) {
      case 'APPROVED': return 'status-approved';
      case 'PENDING': return 'status-pending';
      case 'REJECTED': return 'status-rejected';
      default: return '';
    }
  }
}
