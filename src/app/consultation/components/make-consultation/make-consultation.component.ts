import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from '../../../iam/services/authentication.service';
import { CreateConsultation } from '../../model/create-consulation';
import { ConsultationService } from '../../services/consultation.service';

@Component({
  selector: 'app-make-consultation',
  templateUrl: './make-consultation.component.html',
  styleUrls: ['./make-consultation.component.css']
})
export class MakeConsultationComponent implements OnInit {
  consultation: CreateConsultation = new CreateConsultation(0, 0, '', 1, 0, '');
  consultationTypes = [
    { value: 0, label: 'CIVIL' },
    { value: 1, label: 'CRIMINAL' },
    { value: 2, label: 'LABOR' },
    { value: 3, label: 'FAMILY' },
    { value: 4, label: 'CORPORATE' },
    { value: 5, label: 'TAX' },
    { value: 6, label: 'ADMINISTRATIVE' },
    { value: 7, label: 'INTELLECTUAL PROPERTY' },
    { value: 8, label: 'ENVIRONMENTAL' },
    { value: 9, label: 'INTERNATIONAL' },
    { value: 10, label: 'HUMAN RIGHTS' }
  ];

  constructor(
    private route: ActivatedRoute,
    private consultationService: ConsultationService,
    private authService: AuthenticationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authService.currentUserId.subscribe(id => {
      this.consultation.clientId = id;
    });
    this.route.params.subscribe(params => {
      this.consultation.lawyerId = +params['lawyerId'];
    });
  }

  onSubmit(): void {
    this.consultationService.createConsultation(this.consultation).subscribe({
      next: () => {
        this.snackBar.open('Consulta creada exitosamente', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/lawyer-profile', this.consultation.lawyerId]);
      },
      error: () => {
        this.snackBar.open('Hubo un problema al crear la consulta', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/lawyer-profile', this.consultation.lawyerId]);
      }
    });
  }
}
