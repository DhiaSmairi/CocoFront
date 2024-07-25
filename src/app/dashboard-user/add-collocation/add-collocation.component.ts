import { Component, OnInit } from '@angular/core';
import { CollocationService } from '../../services/collocation.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { user } from '../../models/User';
import { AnnonceCollocation } from '../../models/AnnonceCollocation';
import { DomSanitizer } from '@angular/platform-browser';

export enum TypeLogement {
  appartement = 'appartement',
  maison = 'maison'
}
export enum TypeAnnoColloc {
  room_sharing = 'room_sharing',
  full_recent = 'full_recent'
}

@Component({
  selector: 'app-add-collocation',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-collocation.component.html',
  styleUrl: './add-collocation.component.css'
})
export class AddCollocationComponent implements OnInit {
  collocation={
    "date_dispo": "",
    "nbre_chmbre": 0,
    "descrption": "",
    imageModels:[],
    "nbre_person": 0,
    "typeLogement": "",
    "typeAnnoColloc": "",
    "userId": 0,
    "montant": 0
  }
  image : any;
  user:any 
  typeLogementOptions:TypeLogement[]=[
    TypeLogement.appartement,
    TypeLogement.maison

  ];
  typeAnnoCollocOptions:TypeAnnoColloc[]=[
    TypeAnnoColloc.full_recent,
    TypeAnnoColloc.room_sharing
  ];
  constructor(private collocationservice  : CollocationService ,
     private router : Router,private authService :AuthService, private sannitizer: DomSanitizer){}
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
    this.getCurrentUser();
  }
  selectedFile: File | undefined;
  //productData: AnnonceCollocation = {} as AnnonceCollocation;
  //quantity: number = 0;
  //files: File[] = [];
  selectedimage(event:any){
    this.image=event.target.files[0];
  console.log(event.target.files[0]);
  
  }
  /*
  ajouter(){
    this.collocation.userId=this.user.id;
    let f =new FormData();
    f.append('date_dispo',this.collocation.date_dispo);
    f.append('nbre_chmbre',this.collocation.nbre_chmbre.toString())
    f.append('descrption',this.collocation.descrption)
    f.append('nbre_person',this.collocation.nbre_person.toString())
    f.append('image',this.image);
    f.append('typeLogement',this.collocation.typeLogement)
    f.append('typeAnnoColloc',this.collocation.typeAnnoColloc)
    f.append('montant', this.collocation.montant.toString())
    console.log(f)
    this.collocationservice.ajouter(f).subscribe(
      (res)=>{
       // console.log(this.collocation.descrption);
        //console.log(this.collocation.date_dispo);
        console.log(res);
        this.router.navigate(['dashboardUser/listcollocation'])
        },
        err=>{
          console.log(err);
  
        }
      )
      ;
      }
      */
      ajouter() {
        this.collocation.userId = this.user.id;
        let f = new FormData();
        f.append('collocation', new Blob([JSON.stringify(this.collocation)], { type: 'application/json' }));
        if (this.image) {
            f.append('imageFile', this.image);
        }
        
        this.collocationservice.ajouter(f).subscribe(
            (res) => {
                console.log(res);
                this.router.navigate(['dashboardUser/listcollocation']);
            },
            (err) => {
                console.log(err);
            }
        );
    }
      logout(){
        this.router.navigate(['/login'])
      }


}
