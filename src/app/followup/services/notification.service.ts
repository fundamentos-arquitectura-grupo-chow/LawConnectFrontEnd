import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Notification } from '../model/notification';
import { environment } from '../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = `${environment.serverBasePath}/notification`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getNotificationById(notificationId: number): Observable<Notification> {
    return this.http.get<Notification>(`${this.apiUrl}/${notificationId}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAllNotificationsByConsultationId(consultationId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/legal-case/${consultationId}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAllNotificationsByClientId(clientId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/client/${clientId}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  deleteNotification(notificationId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${notificationId}`, {
      ...this.httpOptions,
      responseType: 'text'
    }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
