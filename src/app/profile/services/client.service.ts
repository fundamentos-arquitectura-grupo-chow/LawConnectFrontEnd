import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../model/client';
import { environment } from '../../../enviroment/enviroment';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private baseUrl = `${environment.serverBasePath}/clients`;

  constructor(private http: HttpClient) {}

  getClientById(clientId: number): Observable<Client> {
    return this.http.get<Client>(`${this.baseUrl}/Id/${clientId}`);
  }

  getAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl);
  }

  getClientIdByEmail(email: string): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/email/${email}`);
  }
}
