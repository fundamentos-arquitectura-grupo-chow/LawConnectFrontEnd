import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VideoCallService } from '../../services/video-call.service';
import { CreateVideoCallResource } from '../../model/create-video-call';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-create-video-call-dialog',
  templateUrl: './create-video-call-dialog.component.html',
  styleUrls: ['./create-video-call-dialog.component.css']
})
export class CreateVideoCallDialogComponent implements OnInit {
  videoCallForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    public dialogRef: MatDialogRef<CreateVideoCallDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { consultationId: number },
    private videoCallService: VideoCallService,
    private fb: FormBuilder
  ) {
    this.videoCallForm = this.fb.group({
      description: ['', Validators.required],
      location: ['', Validators.required],
      scheduledDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Inicialización adicional si es necesaria
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    if (this.videoCallForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    const formValues = this.videoCallForm.value;
    const newVideoCall = new CreateVideoCallResource(
      this.data.consultationId,
      formValues.description,
      formValues.location
    );

    this.videoCallService.createVideoCall(newVideoCall)
      .pipe(
        catchError(error => {
          console.error('Error al crear la videollamada:', error);
          this.errorMessage = 'No se pudo crear la videollamada. Por favor, inténtalo de nuevo.';
          return of(null);
        }),
        finalize(() => {
          this.isLoading = false;
        })
      )
      .subscribe(result => {
        if (result) {
          this.dialogRef.close(true);
        }
      });
  }
}
