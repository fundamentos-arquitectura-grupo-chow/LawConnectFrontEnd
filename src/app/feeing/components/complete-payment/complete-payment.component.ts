// src/app/feeing/components/complete-payment/complete-payment.component.ts
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompletePaymentResource } from '../../model/complete-payment-resource';

@Component({
  selector: 'app-complete-payment',
  templateUrl: './complete-payment.component.html',
  styleUrls: ['./complete-payment.component.css']
})
export class CompletePaymentComponent {
  paymentForm: FormGroup;
  isSubmitting = false;

  constructor(
    private dialogRef: MatDialogRef<CompletePaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { paymentId: number, amount: string },
    private fb: FormBuilder
  ) {
    this.paymentForm = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{16}$')]],
      expirationDate: ['', [Validators.required, Validators.pattern('^(0[1-9]|1[0-2])\/[0-9]{2}$')]],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3,4}$')]]
    });
  }

  onSubmit(): void {
    if (this.paymentForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      const { cardNumber, expirationDate, cvv } = this.paymentForm.value;

      const [month, year] = expirationDate.split('/');
      const formattedExpirationDate = `${year}-${month}`;

      const resource = new CompletePaymentResource(
        cardNumber,
        formattedExpirationDate,
        cvv
      );

      this.dialogRef.close(resource);
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
