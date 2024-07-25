import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CovoiturageService {
 
  constructor(private http : HttpClient , private router:Router) { }
  private  url = 'http://localhost:9093/annoncecovoiturage';
  public  headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
   accessToken = 'pk.eyJ1IjoibWVkbTIiLCJhIjoiY2x3NWwxY2N5MWZzMTJqcGg4eDBjcThhMCJ9.yVLc5p29gUoi7t4fhW6mqQ';
  ajouter(annocecovoi : any){
    return this.http.post(this.url +'/addAnnonce',annocecovoi)
  }
  getAddressFromCoordinates(latitude: number, longitude: number): Observable<any> {
    const url =`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${this.accessToken}`;
   // const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;;
    return this.http.get<any>(url);
  }
getall(){
  return this.http.get<any[]>("http://localhost:9093/annoncecovoiturage/all")
}
supprimer(id:any){
  return this.http.delete(this.url+'/delete/'+id,)

}
modifier(id :any , annocecovoi : any){
  return this.http.put(this.url+'update'+id ,annocecovoi)
}
findByLieuDepart(lieuDepart: any) {
  return this.http.get(this.url + 'bylieu?lieuDepart=' + lieuDepart);
}

rechercherAnnoncesParUtilisateur(userId: any) {
  return this.http.get(this.url + '/byUser?userId=' + userId);
}

trierAnnonceCovoiturageParDate() {
  return this.http.get(this.url + '/sortAnnoncebyDate');
}

getStatsByUsers() {
  return this.http.get(this.url + '/stats/users');
}

getUserWithMostAnnouncements() {
  return this.http.get(this.url + 'userWithMostAnnouncements');
}
getAnnoncesByUser(userId: number): Observable<any> {
  const url = `${this.url}/byUser/${userId}`; // URL complète avec path parameter
  return this.http.get<any>(url);
}
}
