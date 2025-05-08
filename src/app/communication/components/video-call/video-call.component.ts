import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoCallService } from '../../services/video-call.service';
import { VideoCallResource } from '../../model/video-call';
import { AuthenticationService } from '../../../iam/services/authentication.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateVideoCallDialogComponent } from '../create-video-call-dialog/create-video-call-dialog.component';
import { LawyerService } from '../../../profile/services/lawyer.service';
import { Lawyer } from '../../../profile/model/lawyer';
import { ConsultationService } from '../../../consultation/services/consultation.service';
import {Consultation} from "../../../consultation/model/consultation";

@Component({
  selector: 'app-video-call',
  templateUrl: './video-call.component.html',
  styleUrls: ['./video-call.component.css']
})
export class VideoCallComponent implements OnInit {
  videoCalls: VideoCallResource[] = [];
  currentUserRole: string = '';
  consultationId: number = 0;
  lawyer: Lawyer | null = null;
  consultation: Consultation | null = null;

  constructor(
    private route: ActivatedRoute,
    private videoCallService: VideoCallService,
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private lawyerService: LawyerService,
    private consultationService: ConsultationService
  ) {}

  ngOnInit(): void {
    this.authService.currentUserRole.subscribe(role => {
      this.currentUserRole = role;
    });
    this.route.params.subscribe(params => {
      this.consultationId = +params['consultationId'];
      this.loadVideoCalls();
    });
    this.consultationService.getConsultationById(this.consultationId).subscribe(consultation => {
      this.consultation = consultation;
      this.loadLawyerInfo(consultation.lawyerId);
    });
  }

  loadVideoCalls(): void {
    this.videoCallService.getVideoCallByConsultationId(this.consultationId).subscribe(videoCalls => {
      this.videoCalls = videoCalls;
    });
  }

  loadLawyerInfo(lawyerId: number): void {
    this.lawyerService.getLawyerById(lawyerId).subscribe(lawyer => {
      this.lawyer = lawyer;
      console.log('Lawyer:', lawyer);
    });
  }

  createVideoCall(): void {
    const dialogRef = this.dialog.open(CreateVideoCallDialogComponent, {
      width: '400px',
      data: { consultationId: this.consultationId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadVideoCalls();
      }
    });
  }
}
