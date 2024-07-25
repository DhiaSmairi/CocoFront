import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http : HttpClient,private router:Router) { }
  private  url = 'http://localhost:9093/reservations';
  // public  headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  ajouterReservation(annonceId: number, placesReservees: number): Observable<any> {
    return this.http.post<any>(`${this.url}/ajouter/${annonceId}/${placesReservees}`, { responseType: 'text' });
  }
}
