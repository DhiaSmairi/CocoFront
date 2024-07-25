import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Reponse } from '../models/Reponse';
import { Observable } from 'rxjs';
import { Reaction } from '../models/Reaction';

@Injectable({
  providedIn: 'root'
})
export class ReactionresponseService {

  constructor(private httpClient: HttpClient) {
  }
  AddReponse(r: Reponse,idm:number,idu:number): Observable<Reponse> {
      return this.httpClient.post<Reponse>(`http://localhost:9093/ReponseReaction/addReponse/${idm}/${idu}`,r);
    }
    AddReaction(r: Reaction,idm:number,idu:number): Observable<Reaction> {
      return this.httpClient.post<Reaction>(`http://localhost:9093/ReponseReaction/addReaction/${idm}/${idu}`,r);
    }
  
    UpdateReponse(id: number,contenu:String): Observable<Reponse> {
      return this.httpClient.put<Reponse>(`http://localhost:9093/ReponseReaction/UpdateReponse/${id}/${contenu}`,null);
    }
    UpdateReaction(id: number,contenu:String): Observable<Reaction> {
      return this.httpClient.put<Reaction>(`http://localhost:9093/ReponseReaction/UpdateReaction/${id}/${contenu}`,null);
    }
    deleteReaction(id: number) {
      return this.httpClient.delete(`http://localhost:9093/ReponseReaction/RemoveReaction/${id}`);
    }
}
