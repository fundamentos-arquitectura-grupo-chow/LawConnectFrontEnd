import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroment/enviroment';
import { CreateVideoCallResource } from '../model/create-video-call';
import {VideoCallResource} from "../model/video-call";

@Injectable({
  providedIn: 'root'
})
export class VideoCallService {
  private baseUrl = `${environment.serverBasePath}/video_call`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  createVideoCall(resource: CreateVideoCallResource): Observable<VideoCallResource> {
    return this.http.post<VideoCallResource>(this.baseUrl, resource, this.httpOptions);
  }

  getVideoCallByConsultationId(consultationId: number): Observable<VideoCallResource[]> {
    return this.http.get<VideoCallResource[]>(`${this.baseUrl}/${consultationId}`);
  }
}
