import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroment/enviroment';
import {ChatRoomResource} from "../model/chat-room";

@Injectable({
  providedIn: 'root'
})
export class ChatRoomService {
  private baseUrl = `${environment.serverBasePath}/ChatRoom`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getChatRoomByConsultationId(consultationId: number): Observable<ChatRoomResource> {
    return this.http.get<ChatRoomResource>(`${this.baseUrl}/${consultationId}`);
  }
}
