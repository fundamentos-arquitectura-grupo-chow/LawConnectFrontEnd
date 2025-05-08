import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VideoCallService } from '../../services/video-call.service';
import { CreateVideoCallResource } from '../../model/create-video-call';

@Component({
  selector: 'app-create-video-call-dialog',
  templateUrl: './create-video-call-dialog.component.html',
  styleUrls: ['./create-video-call-dialog.component.css']
})
export class CreateVideoCallDialogComponent {
  description: string = '';
  location: string = '';

  constructor(
    public dialogRef: MatDialogRef<CreateVideoCallDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { consultationId: number },
    private videoCallService: VideoCallService
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onCreate(): void {
    const newVideoCall = new CreateVideoCallResource(this.data.consultationId, this.description, this.location);
    this.videoCallService.createVideoCall(newVideoCall).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
