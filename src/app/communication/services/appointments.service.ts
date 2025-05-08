import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroment/enviroment';
import { CreateAppointmentResource } from '../model/create-appointment';
import {AppointmentResource} from "../model/appointment";

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  private baseUrl = `${environment.serverBasePath}/Appointment`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  createAppointment(resource: CreateAppointmentResource): Observable<AppointmentResource> {
    return this.http.post<AppointmentResource>(this.baseUrl, resource, this.httpOptions);
  }

  getAppointmentByConsultationId(consultationId: number): Observable<AppointmentResource[]> {
    return this.http.get<AppointmentResource[]>(`${this.baseUrl}/${consultationId}`);
  }
}
