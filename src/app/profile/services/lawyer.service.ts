import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Lawyer } from '../model/lawyer';
import { environment } from '../../../enviroment/enviroment';
import { AddLawyerPricesResource } from '../model/add-lawyer-prices-resource';
import { AddLawyerTypeResource } from '../model/add-lawyer-type-resource';

@Injectable({
  providedIn: 'root',
})
export class LawyerService {
  private baseUrl = `${environment.serverBasePath}/lawyers`;

  constructor(private http: HttpClient) {}

  getLawyerById(lawyerId: number): Observable<Lawyer> {
    return this.http.get<Lawyer>(`${this.baseUrl}/Id/${lawyerId}`);
  }

  getAllLawyers(): Observable<Lawyer[]> {
    return this.http.get<Lawyer[]>(this.baseUrl);
  }

  getLawyerIdByEmail(email: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/email/${email}`);
  }

  addLawyerPrice(resource: AddLawyerPricesResource): Observable<Lawyer> {
    return this.http.patch<Lawyer>(`${this.baseUrl}/prices`, resource);
  }

  addLawyerType(resource: AddLawyerTypeResource): Observable<Lawyer> {
    return this.http.patch<Lawyer>(`${this.baseUrl}/type`, resource);
  }
}
