import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Payment } from '../model/payment';
import { environment } from '../../../enviroment/enviroment';
import {CompletePaymentResource} from "../model/complete-payment-resource";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrl = `${environment.serverBasePath}/payments`;

  constructor(private http: HttpClient) {}

  completePayment(paymentId: number, resource: CompletePaymentResource): Observable<Payment> {
    return this.http.patch<Payment>(`${this.baseUrl}/consultation/${paymentId}`, resource);
  }

  getAllPaymentsByConsultationId(consultationId: number): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseUrl}/consultation/${consultationId}`);
  }

  getPaymentById(paymentId: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.baseUrl}/${paymentId}`);
  }

  getAllPaymentsByClientId(clientId: number): Observable<Payment[]> {
    return this.http.get<Payment[]>(`${this.baseUrl}/payment/${clientId}`);
  }
}
