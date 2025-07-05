import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-confirm-rejection',
  templateUrl: './confirm-rejection.component.html',
  styleUrl: './confirm-rejection.component.css'
})
export class ConfirmRejectionComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmRejectionComponent>,
  private router: Router) {}

  accept() {
    this.dialogRef.close('confirm');
    this.router.navigate(['/notifications']);

  }

  cancel() {
    this.dialogRef.close('cancel');
  }
}
