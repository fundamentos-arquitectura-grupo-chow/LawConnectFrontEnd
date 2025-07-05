import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs'; // Agregar "of" aquí
import { catchError, retry, tap } from 'rxjs/operators';
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
    console.log('Enviando documento:', document);
    return this.http.post(this.apiUrl, JSON.stringify(document), {
      headers: this.httpOptions.headers,
      responseType: 'text' // Especificar que esperamos respuesta de texto
    }).pipe(
      tap(response => console.log('Respuesta del servidor:', response)),
      catchError(error => {
        console.error('Error en la solicitud HTTP:', error);
        return throwError(() => error);
      })
    );
  }

  getDocumentItemById(documentId: number): Observable<SendDocument> {
    return this.http.get<SendDocument>(`${this.apiUrl}/${documentId}`)
      .pipe(retry(2), catchError(this.handleError));
  }

  getAllDocumentItemsByLegalCaseId(legalCaseId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?legalCaseId=${legalCaseId}`)
      .pipe(
        tap(response => console.log('Documentos recibidos:', response)),
        retry(2),
        catchError(this.handleError)
      );
  }

  updateDocumentStatus(documentId: number, status: number): Observable<any> {
    console.log(`Actualizando estado del documento ${documentId} a ${status}`);

    // Mantener el payload para compatibilidad
    const payload = {
      documentId: documentId,
      status: status
    };

    // Añadir status como parámetro de consulta
    return this.http.patch(
      `${this.apiUrl}/status/${documentId}?status=${status}`,
      payload,
      {
        headers: this.httpOptions.headers,
        responseType: 'text'
      }
    ).pipe(
      tap(response => console.log('Respuesta del servidor:', response)),
      catchError(error => {
        if (error.status === 200) {
          console.log('Estado actualizado correctamente a pesar del error de parsing');
          return of('Document status changed successfully');
        }
        console.error('Error al actualizar estado:', error);
        return throwError(() => error);
      })
    );
  }

  private handleError(error: any) {
    console.error('An error occurred', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
