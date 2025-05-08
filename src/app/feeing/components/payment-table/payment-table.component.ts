import { Component, OnInit, Input } from '@angular/core';
import { AddPaymentComponent } from '../add-payment/add-payment.component';
import { AuthenticationService } from '../../../iam/services/authentication.service';
import { Payment } from '../../model/payment';
import { PaymentService } from '../../services/payment.service';
import { MatDialog } from '@angular/material/dialog';
import { CompletePaymentResource } from '../../model/complete-payment-resource';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-payment-table',
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.css']
})
export class PaymentTableComponent implements OnInit {
  @Input() consultationId!: number;
  payments: Payment[] = [];
  currentUserRole: string = '';

  constructor(
    private paymentService: PaymentService,
    private dialog: MatDialog,
    private authService: AuthenticationService,
    private route: ActivatedRoute
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

  completePayment(paymentId: number): void {
    const resource = new CompletePaymentResource('1234567890123456', '12/25', '123'); // Replace with actual data
    this.paymentService.completePayment(paymentId, resource).subscribe(() => {
      this.loadPayments();
    });
  }
}
