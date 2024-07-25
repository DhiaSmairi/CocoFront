import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CovoiturageService } from '../../services/covoiturage.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mes-annonce-covoi',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './mes-annonce-covoi.component.html',
  styleUrl: './mes-annonce-covoi.component.css'
})
export class MesAnnonceCovoiComponent implements OnInit {
  id:any
  covoitu:any
  deleteSuccessMessage:any
  placesDepart: string[] = []; 
  placesDestination: string[] = [];
  constructor(private route:ActivatedRoute,private covoiturageservice:CovoiturageService){

  }
  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id');
    this.covoiturageservice.getAnnoncesByUser(this.id).subscribe(
        (res) => {
          this.covoitu = res;
          this.placesDepart = []; // Réinitialiser le tableau des lieux de départ
          this.placesDestination = []; // Réinitialiser le tableau des lieux de destination
      
          // Boucle pour chaque covoiturage
          this.covoitu.forEach((covoiturage: any) => {
            // Récupération du lieu de départ
            if (covoiturage.departLatitude && covoiturage.departLongitude) {
              this.covoiturageservice.getAddressFromCoordinates(covoiturage.departLatitude, covoiturage.departLongitude)
                .subscribe((response: any) => {
                  if (response.features && response.features.length > 0) {
                    const placeName = response.features[0].place_name; // Prendre le premier résultat
                    this.placesDepart.push(placeName);
                    console.log("Lieu de départ:", placeName);
                  } else {
                    this.placesDepart.push('Lieu de départ inconnu');
                  }
                }, (error) => {
                  console.error('Erreur lors de la récupération du lieu de départ:', error);
                  this.placesDepart.push('Erreur de géocodage');
                });
            } else {
              this.placesDepart.push('Coordonnées de départ manquantes');
            }
      
            // Récupération du lieu de destination
            if (covoiturage.destinationLatitude && covoiturage.destinationLongitude) {
              this.covoiturageservice.getAddressFromCoordinates(covoiturage.destinationLatitude, covoiturage.destinationLongitude)
                .subscribe((response: any) => {
                  if (response.features && response.features.length > 0) {
                    const placeName = response.features[0].place_name; // Prendre le premier résultat
                    this.placesDestination.push(placeName);
                    console.log("Lieu de destination:", placeName);
                  } else {
                    this.placesDestination.push('Lieu de destination inconnu');
                  }
                }, (error) => {
                  console.error('Erreur lors de la récupération du lieu de destination:', error);
                  this.placesDestination.push('Erreur de géocodage');
                });
            } else {
              this.placesDestination.push('Coordonnées de destination manquantes');
            }
          });
        },
        (err) => {
          console.error('Erreur lors de la récupération des données:', err);
        }
      );
    
  }
  deleteCovoiturage(id: any) {
    // Call your service method to delete the collocation item by id
    this.covoiturageservice.supprimer(id).subscribe(
      (res) => {
        // Handle success response or update UI as needed
        console.log("Collocation deleted successfully");
        this.deleteSuccessMessage = 'La collocation a été supprimée avec succès.';
        this.ngOnInit(); 
      },
      (err) => {
        // Handle error response
        console.error("Error deleting collocation:", err);
      }
    );
  }
}
