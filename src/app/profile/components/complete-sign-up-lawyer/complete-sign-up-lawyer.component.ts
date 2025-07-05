import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LawyerService } from '../../services/lawyer.service';
import { AddLawyerPricesResource } from '../../model/add-lawyer-prices-resource';
import { AddLawyerTypeResource } from '../../model/add-lawyer-type-resource';

@Component({
  selector: 'app-complete-sign-up-lawyer',
  templateUrl: './complete-sign-up-lawyer.component.html',
  styleUrls: ['./complete-sign-up-lawyer.component.css']
})
export class CompleteSignUpLawyerComponent {
  specialties = [
    { id: 0, name: 'CIVIL' },
    { id: 1, name: 'CRIMINAL' },
    { id: 2, name: 'LABOR' },
    { id: 3, name: 'FAMILY' },
    { id: 4, name: 'CORPORATE' },
    { id: 5, name: 'TAX' },
    { id: 6, name: 'ADMINISTRATIVE' },
    { id: 7, name: 'INTELLECTUAL_PROPERTY' },
    { id: 8, name: 'ENVIRONMENTAL' },
    { id: 9, name: 'INTERNATIONAL' },
    { id: 10, name: 'HUMAN_RIGHTS' }
  ];

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private lawyerService: LawyerService,
    public dialogRef: MatDialogRef<CompleteSignUpLawyerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { lawyerId: number }
  ) {
    this.form = this.fb.group({
      specialty: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { specialty, price } = this.form.value;
      const lawyerId = this.data.lawyerId;

      const addLawyerTypeResource: AddLawyerTypeResource = { lawyerId, lawyerTypeId: Number(specialty) };
      const addLawyerPricesResource: AddLawyerPricesResource = { lawyerId, price };

      this.lawyerService.addLawyerType(addLawyerTypeResource).subscribe(() => {
        this.lawyerService.addLawyerPrice(addLawyerPricesResource).subscribe(() => {
          this.dialogRef.close();
        });
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
