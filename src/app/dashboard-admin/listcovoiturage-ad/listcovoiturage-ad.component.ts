import { Component, OnInit } from '@angular/core';
import { CollocationService } from '../../services/collocation.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CovoiturageService } from '../../services/covoiturage.service';
import { ReservationService } from '../../services/reservation.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listcovoiturage-ad',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './listcovoiturage-ad.component.html',
  styleUrl: './listcovoiturage-ad.component.css'
})
export class ListcovoiturageAdComponent   implements OnInit {
  deleteSuccessMessage: any;
  constructor( private router: Router , private list : CovoiturageService,  private reservationService: ReservationService){}
  covoitu: any[] = []; // Liste de covoiturages
  placesDepart: string[] = []; 
  placesDestination: string[] = [];
  ngOnInit(): void {
    this.list.getall().subscribe(
      (res) => {
        this.covoitu = res;
        this.placesDepart = []; // Réinitialiser le tableau des lieux de départ
        this.placesDestination = []; // Réinitialiser le tableau des lieux de destination
    
        // Boucle pour chaque covoiturage
        this.covoitu.forEach((covoiturage: any) => {
          // Récupération du lieu de départ
          if (covoiturage.departLatitude && covoiturage.departLongitude) {
            this.list.getAddressFromCoordinates(covoiturage.departLatitude, covoiturage.departLongitude)
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
            this.list.getAddressFromCoordinates(covoiturage.destinationLatitude, covoiturage.destinationLongitude)
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
  async afficherPopupReservation(annonceId: number) {
    const { value: placesReservees } = await Swal.fire({
      title: 'Nombre de places',
      input: 'number',
      inputLabel: 'Combien de places souhaitez-vous réserver ?',
      inputAttributes: {
        min: '1',
        step: '1'
      },
      showCancelButton: true,
      confirmButtonText: 'Réserver',
      cancelButtonText: 'Annuler'
    });

    if (placesReservees) {
      this.reserverAnnonce(annonceId, placesReservees);
    }
  }

  reserverAnnonce(annonceId: number, placesReservees: number): void {
    console.log("annonce"+annonceId+"place"+placesReservees)
    this.reservationService.ajouterReservation(annonceId, placesReservees)
      .subscribe(
        response => {
          Swal.fire('Succès', response.message, 'success');
          this.ngOnInit()
        },
        error => {
          console.log(error)
        //  Swal.fire('Erreur', 'Une erreur s\'est produite', 'error');
        this.ngOnInit()
        }
      );
  }
  deleteCovoiturage(id: any) {
    // Call your service method to delete the collocation item by id
    this.list.supprimer(id).subscribe(
      (res) => {
        // Handle success response or update UI as needed
        console.log("Covoiturage deleted successfully");
        this.deleteSuccessMessage = 'La Covoiturage a été supprimée avec succès.';
        this.ngOnInit(); 
      },
      (err) => {
        // Handle error response
        console.error("Error deleting Covoiturage:", err);
        this.deleteSuccessMessage = 'La Covoiturage a été supprimée avec succès.';
        this.ngOnInit(); 
      },
    )}
  }

