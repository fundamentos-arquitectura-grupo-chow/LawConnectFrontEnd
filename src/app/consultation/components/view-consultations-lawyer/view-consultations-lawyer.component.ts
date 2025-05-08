import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConsultationService } from '../../services/consultation.service';
import { Consultation } from '../../model/consultation';
import { AuthenticationService } from '../../../iam/services/authentication.service';

@Component({
  selector: 'app-view-consultations-lawyer',
  templateUrl: './view-consultations-lawyer.component.html',
  styleUrls: ['./view-consultations-lawyer.component.css']
})
export class ViewConsultationsLawyerComponent implements OnInit {
  consultations: Consultation[] = [];
  currentUserId: number = 0;

  constructor(
    private consultationService: ConsultationService,
    private authService: AuthenticationService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authService.currentUserId.subscribe(userId => {
      this.currentUserId = userId;
      this.loadPendingConsultations();
    });
  }

  loadPendingConsultations(): void {
    this.consultationService.getAllConsultationsByLawyerId(this.currentUserId).subscribe(consultations => {
      this.consultations = consultations.filter(consultation => consultation.applicationStatus === 'PENDING');
    });
  }

  approveConsultation(consultationId: number): void {
    this.consultationService.approveConsultation(consultationId).subscribe(() => {

    });
    this.snackBar.open('Consulta aprobada', 'Cerrar', { duration: 3000 });
    this.loadPendingConsultations();
  }

  declineConsultation(consultationId: number): void {
    this.consultationService.declineConsultation(consultationId).subscribe(() => {

    });
    this.snackBar.open('Consulta rechazada', 'Cerrar', { duration: 3000 });
    this.loadPendingConsultations();
  }
}
