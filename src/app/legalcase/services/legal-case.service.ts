import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LegalCase } from '../model/legal-case';
import { environment } from '../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root'
})
export class LegalCaseService {
  private apiUrl = `${environment.serverBasePath}/legal_cases`;

  constructor(private http: HttpClient) { }

  getLegalCaseById(legalCaseId: number): Observable<LegalCase> {
    return this.http.get<LegalCase>(`${this.apiUrl}/${legalCaseId}`);
  }

  getAllLegalCases(): Observable<LegalCase[]> {
    return this.http.get<LegalCase[]>(this.apiUrl);
  }

  closeLegalCase(legalCaseId: number): Observable<string> {
    return this.http.patch(`${this.apiUrl}/close/${legalCaseId}`, {}, {
      responseType: 'text'
    });
  }

  getLegalCaseByConsultationId(consultationId: number): Observable<LegalCase> {
    return this.http.get<LegalCase>(`${this.apiUrl}/consultation/${consultationId}`);
  }
}
