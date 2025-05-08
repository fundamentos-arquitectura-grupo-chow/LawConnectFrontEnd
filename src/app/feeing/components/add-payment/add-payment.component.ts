import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConsultationService } from '../../../consultation/services/consultation.service';
import { AddPaymentResource } from '../../model/add-payment';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent {
  amount: number = 0;
  currency: string = 'PEN'; // Default currency

  constructor(
    private dialogRef: MatDialogRef<AddPaymentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { consultationId: number },
    private consultationService: ConsultationService
  ) {}

  accept() {
    const resource = new AddPaymentResource(this.data.consultationId, this.amount, 1);
    this.consultationService.addPaymentToConsultation(resource).subscribe(() => {
      this.dialogRef.close('confirm');
    });
    this.dialogRef.close('confirm');
  }

  cancel() {
    this.dialogRef.close('cancel');
  }
}
