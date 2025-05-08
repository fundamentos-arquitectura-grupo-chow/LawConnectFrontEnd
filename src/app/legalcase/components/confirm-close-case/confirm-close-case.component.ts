import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-confirm-close-case',
  templateUrl: './confirm-close-case.component.html',
  styleUrl: './confirm-close-case.component.css'
})
export class ConfirmCloseCaseComponent {
  constructor(private dialogRef: MatDialogRef<ConfirmCloseCaseComponent>,
              private router: Router) {}

  accept() {
    this.dialogRef.close('confirm');
    this.router.navigate(['/notifications']);

  }

}
