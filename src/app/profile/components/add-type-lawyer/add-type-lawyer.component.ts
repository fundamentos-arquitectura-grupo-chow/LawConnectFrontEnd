import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LawyerService } from '../../services/lawyer.service';
import { AddLawyerTypeResource } from '../../model/add-lawyer-type-resource';
import {AuthenticationService} from "../../../iam/services/authentication.service";

@Component({
  selector: 'app-add-type-lawyer',
  templateUrl: './add-type-lawyer.component.html',
  styleUrls: ['./add-type-lawyer.component.css']
})
export class AddTypeLawyerComponent {
  currentId: number = 0;

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
    private authService: AuthenticationService,
    public dialogRef: MatDialogRef<AddTypeLawyerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { lawyerId: number }
  ) {
    this.form = this.fb.group({
      specialty: [null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      const { specialty } = this.form.value;
      this.authService.currentUserId.subscribe(
        (id) => {
          this.currentId = id;
        }
      );
      const lawyerId = this.currentId;
      const addLawyerTypeResource: AddLawyerTypeResource = { lawyerId, lawyerTypeId: specialty };

      console.log(addLawyerTypeResource);
      this.lawyerService.addLawyerType(addLawyerTypeResource).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
