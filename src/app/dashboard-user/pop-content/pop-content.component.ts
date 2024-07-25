import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MapleafletComponent } from '../mapleaflet/mapleaflet.component';
import { CovoiturageService } from '../../services/covoiturage.service';
import { AuthService } from '../../services/auth.service';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
enum TypeCovoiturage {
  Quotidien = 'quotidien',
  Occasionnelle = 'occasionnelle'
}
@Component({
  selector: 'app-pop-content',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './pop-content.component.html',
  styleUrl: './pop-content.component.css'
})
export class PopContentComponent  implements OnInit {
  data : any;
  user:any;
  covoiturage={
  
    designation: '',
    heure_Depart: '',
    lieu_depart: '',
    nbrePlaceDisponible: 0,
    lieu_fin:'',
    typeCovoiturage: "",
    idUSEr: 0,
 
    destinationLatitude:0,
   destinationLongitude : 0,
   departLatitude : 0,
   departLongitude :0

  }
 
 
  @Output() okClicked = new EventEmitter<void>();
  @ViewChild(MapleafletComponent) mapleafletComponent: any;

  
  constructor(private carppolingServiceService: CovoiturageService , private adminService : AuthService ,private authService:AuthService) { }
  ngOnInit(): void {
    this.getCurrentUser();
  }
  getCurrentUser(){
    this.authService.getCurrentUser().subscribe({
      next:(data)=>{
        console.log(data);
        this.user=data
        console.log(this.user);
      },
      error(err) {
        console.log(err)
        
      },
    })}
  onMapClick(event: L.LeafletMouseEvent): void {
    // Récupérer les coordonnées du clic
    const lat = event.latlng.lat;
    const lng = event.latlng.lng;

    // Assigner les coordonnées à votre objet carpooling
    this.covoiturage.destinationLatitude = lat;
    this.covoiturage.destinationLongitude = lng;
  }

  onOkClick(productForm: NgForm): void {
    console.log(this.user.id)
   // const formData = this.preparedFormData(this.covoiturage);
        this.adminService.getData().subscribe((data) => { 

          this.covoiturage.departLatitude=data.position1.lat
          this.covoiturage.departLongitude=data.position1.lng
          this.covoiturage.destinationLatitude=data.position2.lat
          this.covoiturage.destinationLongitude=data.position2.lng
               }
             );
             console.log(this.user.id)
             this.covoiturage.idUSEr=this.user.id
    this.carppolingServiceService.ajouter(this.covoiturage).subscribe(
      (result: any) => {
        console.log('Carpooling ajouté avec succès !', result);
        this.resetForm(productForm); // Réinitialiser le formulaire après ajout réussi
        this.okClicked.emit(); 
        Swal.fire('Success!', 'Carpooling ajouté avec succès', 'success');
        this.mapleafletComponent
        
        // Émettre un événement pour indiquer que l'ajout est effectué
      },
      (error) => {
        console.error('Erreur lors de l\'ajout du carpooling :', error);
        // Traitez ici les erreurs de l'ajout du carpooling
      }
    );
  }
  

  
  
  
  

  resetForm(productForm: NgForm): void {
    productForm.resetForm(); // Réinitialiser le formulaire
    this.covoiturage = {
      "designation": "",
      heure_Depart: '',
      lieu_depart: '',
      nbrePlaceDisponible: 0,
      lieu_fin:'',
     typeCovoiturage: "",
      idUSEr: 1,
   // typeCovoiturage: TypeCovoiturage.quotidien
      destinationLatitude:0,
     destinationLongitude : 0,
     departLatitude : 0,
     departLongitude :0
    };
  }

}
