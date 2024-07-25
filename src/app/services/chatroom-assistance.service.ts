import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Chatrromassistance } from '../models/Chatrromassistance';
import { user } from '../models/User';
import { MessageChattrom } from '../models/MessageChattrom';

@Injectable({
  providedIn: 'root'
})
export class ChatroomAssistanceService {

  constructor(private httpClient: HttpClient) { }
  getAllUsers() {
    return this.httpClient.get<user>('http://localhost:9093/Chatroom/AllUsers');
  }
getAllRooms() {
    return this.httpClient.get<any>('http://localhost:9093/Chatroom/AllChatroom');
  }
deleteChaatroom(id: number) {
    return this.httpClient.delete(`http://localhost:9093/Chatroom/Delete/${id}`);
  }
  joindre(idu: number,idroom:number): Observable<Chatrromassistance> {
    return this.httpClient.put<Chatrromassistance>(`http://localhost:9093/Chatroom/joindre/${idu}/${idroom}`,null);
  }
  invite(ids: number[], idroom: number): Observable<Chatrromassistance> {
    return this.httpClient.post<Chatrromassistance>(`http://localhost:9093/Chatroom/invite/${idroom}`,ids);
  }
  updateChatroom(c: Chatrromassistance): Observable<Chatrromassistance> {
    return this.httpClient.post<Chatrromassistance>(`http://localhost:9093/Chatroom/update`,c);
  }
  AddChatroom(c: Chatrromassistance,id:number): Observable<Chatrromassistance> {
    return this.httpClient.post<Chatrromassistance>(`http://localhost:9093/Chatroom/add/${id}`,c);
  }

  AddMessage(m: MessageChattrom,idromm:number,idu:number): Observable<MessageChattrom> {
    return this.httpClient.post<MessageChattrom>(`http://localhost:9093/Message/add/${idromm}/${idu}`,m);
  }
  UpdateMessage(m: MessageChattrom): Observable<MessageChattrom> {
    return this.httpClient.post<MessageChattrom>(`http://localhost:9093/Message/update`,m);
  }
  deleteMessage(id: number) {
    return this.httpClient.delete(`http://localhost:9093/Message/remove/${id}`);
  }
  username(id:number){
    return this.httpClient.get<string>(`http://localhost:9093/Chatroom/getusername/${id}`);
  }
}
