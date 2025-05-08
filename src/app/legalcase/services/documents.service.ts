import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { SendDocument } from '../model/send-document';
import { environment } from '../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  private apiUrl = `${environment.serverBasePath}/documents`;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  addDocumentItem(document: SendDocument): Observable<any> {
    return this.http.post<any>(this.apiUrl, JSON.stringify(document), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  getDocumentItemById(documentId: number): Observable<SendDocument> {
    return this.http.get<SendDocument>(`${this.apiUrl}/${documentId}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAllDocumentItemsByLegalCaseId(legalCaseId: number): Observable<SendDocument[]> {
    return this.http.get<SendDocument[]>(`${this.apiUrl}?legalCaseId=${legalCaseId}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
