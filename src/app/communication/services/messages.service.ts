import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../enviroment/enviroment';
import { MessageResource } from '../model/message';
import {AddMessageByChatRoomIdResource} from "../model/add-message";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {
  private baseUrl = `${environment.serverBasePath}/message`;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getAllMessagesByChatRoomId(chatRoomId: number): Observable<MessageResource[]> {
    return this.http.get<MessageResource[]>(`${this.baseUrl}/${chatRoomId}`);
  }

  addMessageByChatRoomId(resource: AddMessageByChatRoomIdResource): Observable<any> {
    return this.http.post<any>(this.baseUrl, resource, this.httpOptions);
  }
}
