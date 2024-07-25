import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TrajetService {

  constructor(private http : HttpClient) { }
  calculateRoute(startLat: number, startLng: number, endLat: number, endLng: number): Observable<any> {
    const apiKey = '83637583-8d01-4f6e-8dd1-265850ca787f';
    const apiUrl = `https://graphhopper.com/api/1/route?point=${startLat},${startLng}&point=${endLat},${endLng}&vehicle=foot&key=${apiKey}`;
    return this.http.get(apiUrl);
  }
  
}
