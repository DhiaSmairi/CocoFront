import { Component, OnInit } from '@angular/core';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as L from 'leaflet';
import * as Leaflet from 'leaflet'; 
import "leaflet-control-geocoder";
//import "leaflet/dist/images/marker-shadow.png"; // Add this line
//import "leaflet/dist/images/marker-icon-2x.png"; // Add this line
//import "leaflet/dist/images/marker-icon.png"; // Add this line
import { TrajetService } from '../../services/trajet.service';
//import userMarkerIcon from 'assets/markers.jpg';
Leaflet.Icon.Default.mergeOptions({
 // iconRetinaUrl: 'user.jpg',
  iconUrl: 'assets/marker.png',
  //shadowUrl: 'assets/marker-sh.png'
});
@Component({
  selector: 'app-maps',
  standalone: true,
  imports: [LeafletModule ],
  templateUrl: './maps.component.html',
  styleUrl: './maps.component.css'
})
export class MapsComponent implements OnInit {
   map!: Leaflet.Map;
  markers: Leaflet.Marker[] = [];
  
  options = {
    layers: [
      Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      })
    ],
    zoom: 16,
    center: {  lat: 33.892166, lng: 9.561555499999997 }
    
  }
  constructor(private trajet : TrajetService ){}
  ngOnInit(): void {
  
 
    }
 /* ngOnInit(): void {
  this.configMap();
  }

  configMap() {
    const map = L.map('map').setView([51.509, -0.11], 10);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);
    var circle = L.circle([51.508, -0.11], {
      color: 'red',
      fillColor: '#f03',
      fillOpacity: 0.5,
      radius: 500
  }).addTo(map);
    var marker = L.marker([36.7462304,9.2032328]).addTo(map);
    var polygon = L.polygon([
      [51.509, -0.08],
      [51.503, -0.06],
      [51.51, -0.047]
  ]).addTo(map);
  }

}*/

 

  initMarkers() {
    const initialMarkers = [
      {
        position: {  lat: 33.892166, lng: 9.561555499999997 },
        draggable: true
      },
      {
        position: {  lat: 33.892166, lng: 9.561555499999997 },
        draggable: false
      },
      {
        position: {  lat: 33.892166, lng: 9.561555499999997 },
        draggable: true
      }
    ];
    for (let index = 0; index < initialMarkers.length; index++) {
      const data = initialMarkers[index];
      const marker = this.generateMarker(data, index);
      marker.addTo(this.map).bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b>`);
      this.map.panTo(data.position);
      this.markers.push(marker)
     // this.map.removeLayer(this.markers[index])
     this.markers.splice(index, 1)
      this.markers[index].setLatLng({  lat: 33.892166, lng: 9.561555499999997 });
    }
   const data = {
  position: { lat: 33.892166, lng: 9.561555499999997 },
  draggable: true
}
const marker = this.generateMarker(data, this.markers.length - 1);
marker.addTo(this.map).bindPopup(`<b>${data.position.lat},  ${data.position.lng}</b>`);
this.markers.push(marker);
//his.markers.getIcon();

  }

  generateMarker(data: any, index: number) {
    const customIcon = L.icon({
      iconUrl: 'assets/marker.png',
      iconSize: [32, 32], // Adjust the size as needed
      iconAnchor: [16, 32] // Adjust the anchor point if necessary
    });
  
    return L.marker(data.position, { draggable: data.draggable, icon: customIcon })
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
  }
/*
  generateMarker(data: any, index: number) {
    return Leaflet.marker(data.position, { draggable: data.draggable })
      .on('click', (event) => this.markerClicked(event, index))
      .on('dragend', (event) => this.markerDragEnd(event, index));
      
  }
*/
  onMapReady($event: Leaflet.Map) {
    this.map = $event;
    this.initMarkers();
  }
/*
  mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }
*/
  markerClicked($event: any, index: number) {
    console.log($event.latlng.lat, $event.latlng.lng);
  }

  markerDragEnd($event: any, index: number) {
    console.log($event.target.getLatLng());
  } 
  getAddress(lat: number, lng: number) {
    const geocoder = (Leaflet.Control as any).Geocoder.nominatim();
    return new Promise((resolve, reject) => {
        geocoder.reverse(
            { lat, lng },
            this.map.getZoom(),
            (results: any) => results.length ? resolve(results[0].name) : reject(null)
        );
    })
  }
  async mapClicked($event: any) {
    console.log($event.latlng.lat, $event.latlng.lng);
    const address = await this.getAddress($event.latlng.lat, $event.latlng.lng);
    console.log(address)
  }/*
 markerClicked($event: any, index: number) {
  const markerPosition = $event.latlng;
  const startLat = markerPosition.lat;
  const startLng = markerPosition.lng;
  const endLat = this.markers[index].getLatLng().lat; // Latitude de la zone cliquée
  const endLng = this.markers[index].getLatLng().lng; // Longitude de la zone cliquée

  this.trajet.calculateRoute(startLat, startLng, endLat, endLng).subscribe((response: any) => {
    // Traitez la réponse du service de calcul de trajet ici
    console.log(response);

    // Récupérez les coordonnées des points du trajet à partir de la réponse
    const coordinates = response.paths[0]?.points.coordinates;

    // Créez un tableau de coordonnées Leaflet à partir des coordonnées du trajet
    const latLngs = coordinates.map((coord: number[]) => L.latLng(coord[1], coord[0]));

    // Créez un trajet Leaflet à partir des coordonnées du trajet
    const trajetLayer = L.polyline(latLngs, { color: 'blue' });

    // Ajoutez le trajet à la carte
    trajetLayer.addTo(this.map);
    // this.map.fitBounds(trajetLayer.getBounds()); // Ajuste le zoom de la carte pour afficher le trajet entier
  });
}*/
  
}