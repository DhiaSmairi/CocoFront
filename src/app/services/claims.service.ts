import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Claims } from '../models/Claims';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClaimsService {

  constructor(private httpClient: HttpClient){}
  GetALLClaims() {
      return this.httpClient.get<Claims>('http://localhost:9093/GetALLClaims');
    }
    findByUser(id:number) {
      return this.httpClient.get<Claims>(`http://localhost:9093/findByUser/${id}`);
    }
  AddClaim(claim:Claims): Observable<Claims> {
      return this.httpClient.post<Claims>('http://localhost:9093/addClaims', claim);
    }
    statusClaims(id: number, statu:string): Observable<Claims> {
      console.log("id"+id+"stat"+statu)
      return this.httpClient.put<Claims>(`http://localhost:9093/statusClaims/${id}/${statu}`, Claims);
    }
    Delete(id: number) {
      return this.httpClient.delete(`http://localhost:9093/DeleteClaims/${id}`);
    }
    UpdateClaims(claim: Claims): Observable<Claims> {
      return this.httpClient.put<Claims>('http://localhost:9093/UpdateClaims', claim);
    }
    calculateClaimPercentage(): Observable<Map<string, number>> {
      return this.httpClient.get<Map<string, number>>('http://localhost:9093/calculateClaimPercentage');
    }
    getClaims(page: number, size: number): Observable<Claims[]> {
      const params = new HttpParams()
        .set('page', page.toString())
        .set('size', size.toString());
  
      return this.httpClient.get<Claims[]>('http://localhost:9093/claims/page', { params });
    }
}
