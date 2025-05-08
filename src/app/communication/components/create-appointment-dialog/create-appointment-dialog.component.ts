import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AppointmentsService } from '../../services/appointments.service';
import { CreateAppointmentResource } from '../../model/create-appointment';

@Component({
  selector: 'app-create-appointment-dialog',
  templateUrl: './create-appointment-dialog.component.html',
  styleUrls: ['./create-appointment-dialog.component.css']
})
export class CreateAppointmentDialogComponent {
  description: string = '';
  location: string = '';

  constructor(
    public dialogRef: MatDialogRef<CreateAppointmentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { consultationId: number },
    private appointmentsService: AppointmentsService
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    const newAppointment = new CreateAppointmentResource(this.data.consultationId, this.description, this.location);
    this.appointmentsService.createAppointment(newAppointment).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
