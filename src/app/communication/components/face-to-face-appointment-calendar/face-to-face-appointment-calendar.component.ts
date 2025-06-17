import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentsService } from '../../services/appointments.service';
import { AppointmentResource } from '../../model/appointment';
import { AuthenticationService } from '../../../iam/services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateAppointmentDialogComponent } from '../create-appointment-dialog/create-appointment-dialog.component';
import { MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-face-to-face-appointment-calendar',
  templateUrl: './face-to-face-appointment-calendar.component.html',
  styleUrls: ['./face-to-face-appointment-calendar.component.css']
})
export class FaceToFaceAppointmentCalendarComponent implements OnInit {
  appointments: AppointmentResource[] = [];
  currentUserRole: string = '';
  consultationId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private appointmentsService: AppointmentsService,
    private authService: AuthenticationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.authService.currentUserRole.subscribe(role => {
      this.currentUserRole = role;
    });
    this.route.params.subscribe(params => {
      this.consultationId = +params['consultationId'];
      this.loadAppointments();
    });
  }

  loadAppointments(): void {
    this.appointmentsService.getAppointmentByConsultationId(this.consultationId).subscribe(appointments => {
      this.appointments = appointments;
    });
  }

  createAppointment(): void {
    const dialogRef = this.dialog.open(CreateAppointmentDialogComponent, {
      width: '400px',
      data: { consultationId: this.consultationId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadAppointments();
      }
    });
  }
}
