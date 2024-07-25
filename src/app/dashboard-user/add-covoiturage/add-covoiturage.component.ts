import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';;
import { CovoiturageService } from '../../services/covoiturage.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
export enum TypeCovoiturage {
  quotidien = 'quotidien',
  occasionnelle = 'occasionnelle'
}

@Component({
  selector: 'app-add-covoiturage',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-covoiturage.component.html',
  styleUrl: './add-covoiturage.component.css'
})
export class AddCovoiturageComponent implements OnInit {
  user:any;
  covoiturage={
  
    "designation": "",
    "heure_Depart": "",
    "lieu_fin": "",
    "lieu_depart": "",
    "nbrePlaceDisponible": 0 ,
    "typeCovoiturage": "",
    "idUSEr": 0,
 // typeCovoiturage: TypeCovoiturage.quotidien

  }

  typeCovoiturageOptions: TypeCovoiturage[] = [
    TypeCovoiturage.quotidien,
    TypeCovoiturage.occasionnelle
  ];    
  constructor(private covoiturageService  : CovoiturageService , private router : Router , private authService :AuthService){}
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
  ngOnInit(): void {
    this.getCurrentUser()
  }
    ajouter(){
      this.covoiturage.idUSEr=this.user.id;
      console.log(this.covoiturage)
     
      this.covoiturageService.ajouter(this.covoiturage).subscribe(
        (res)=>{
          console.log(this.covoiturage.designation);
  
          console.log(this.covoiturage.nbrePlaceDisponible);
  
      console.log(res);
      this.router.navigate(['dashboardUser/listmeetcovoi'])
        },
        err=>{
          console.log(err);
  
        }
      )
      ;
  }
  logout(){
    this.router.navigate(['/login'])
  }
    }

