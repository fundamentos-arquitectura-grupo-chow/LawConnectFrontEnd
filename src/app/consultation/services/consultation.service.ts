import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consultation } from '../model/consultation';
import { environment } from '../../../enviroment/enviroment';
import { CreateConsultation } from '../model/create-consulation';
import { AddPaymentResource } from '../../feeing/model/add-payment';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  private apiUrl = `${environment.serverBasePath}/consultations`;

  constructor(private http: HttpClient) { }

  createConsultation(resource: CreateConsultation): Observable<Consultation> {
    return this.http.post<Consultation>(this.apiUrl, resource);
  }

  getAllConsultationsByLawyerId(lawyerId: number): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(`${this.apiUrl}/lawyer/${lawyerId}`);
  }

  getAllConsultationsByClientId(clientId: number): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(`${this.apiUrl}/client/${clientId}`);
  }

  getAllConsultationsByLawyerIdAndClientId(lawyerId: number, clientId: number): Observable<Consultation[]> {
    return this.http.get<Consultation[]>(`${this.apiUrl}/client/${clientId}/lawyer/${lawyerId}`);
  }

  deleteConsultation(consultationId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${consultationId}`);
  }

  addPaymentToConsultation(resource: AddPaymentResource): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/payments`, resource);
  }

  approveConsultation(consultationId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${consultationId}/approve`, {});
  }

  declineConsultation(consultationId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${consultationId}/decline`, {});
  }

  getConsultationById(consultationId: number): Observable<Consultation> {
    return this.http.get<Consultation>(`${this.apiUrl}/${consultationId}`);
  }
}
