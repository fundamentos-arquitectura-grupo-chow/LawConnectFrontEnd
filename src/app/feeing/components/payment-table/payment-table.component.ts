import { Component, OnInit, Input } from '@angular/core';
import { AddPaymentComponent } from '../add-payment/add-payment.component';
import { AuthenticationService } from '../../../iam/services/authentication.service';
import { Payment } from '../../model/payment';
import { PaymentService } from '../../services/payment.service';
import { MatDialog } from '@angular/material/dialog';
import { CompletePaymentResource } from '../../model/complete-payment-resource';
import {ActivatedRoute} from "@angular/router";
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompletePaymentComponent} from "../complete-payment/complete-payment.component";

@Component({
  selector: 'app-payment-table',
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.css']
})
export class PaymentTableComponent implements OnInit {
  @Input() consultationId!: number;
  payments: Payment[] = [];
  currentUserRole: string = '';
  isProcessing: boolean = false;
  processingPaymentId: number | null = null;

  constructor(
    private paymentService: PaymentService,
    private dialog: MatDialog,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.authService.currentUserRole.subscribe(role => {
      console.log(role);
      this.currentUserRole = role;
    });
    this.route.params.subscribe(params => {
      this.consultationId = +params['consultationId'];
    });
    this.loadPayments();
  }

  loadPayments(): void {
    this.paymentService.getAllPaymentsByConsultationId(this.consultationId).subscribe(payments => {
      this.payments = payments;
    });
  }

  createPayment(): void {
    const dialogRef = this.dialog.open(AddPaymentComponent, {
      width: '400px',
      data: { consultationId: this.consultationId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadPayments();
      }
    });
  }

  completePayment(paymentId: number, amount: string): void {
    const dialogRef = this.dialog.open(CompletePaymentComponent, {
      width: '400px',
      data: { paymentId, amount }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.isProcessing = true;
        this.processingPaymentId = paymentId;

        this.paymentService.completePayment(paymentId, result).subscribe({
          next: () => {
            this.snackBar.open('Pago completado con éxito', 'Cerrar', {
              duration: 3000,
              panelClass: ['success-snackbar']
            });
            this.loadPayments();
            this.isProcessing = false;
            this.processingPaymentId = null;
          },
          error: (error) => {
            console.error('Error al procesar pago', error);
            this.snackBar.open('Error al procesar el pago. Intente nuevamente.', 'Cerrar', {
              duration: 5000,
              panelClass: ['error-snackbar']
            });
            this.isProcessing = false;
            this.processingPaymentId = null;
          }
        });
      }
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'PENDING': return 'status-pending';
      case 'COMPLETED': return 'status-completed';
      case 'CANCELLED': return 'status-cancelled';
      default: return '';
    }
  }
}
