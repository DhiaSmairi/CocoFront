import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CovoiturageService } from '../../services/covoiturage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listannonceuser',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './listannonceuser.component.html',
  styleUrl: './listannonceuser.component.css'
})
export class ListannonceuserComponent implements OnInit {
  public url='http://localhost:9093/'
cocvoitu : any;
userId = 1;
constructor(private listUser : CovoiturageService , private router : Router ,  ){}

  ngOnInit(): void {
    this.listUser.rechercherAnnoncesParUtilisateur(this.userId).subscribe(
        (res)=>{
          this.cocvoitu = res;
          console.log(res)
        },
        (err)=>{
          console.log(err)
        }
    )
    }
  
    deleteCovoiturage(annonceId: any): void {
      this.listUser.supprimer(annonceId).subscribe(
        () => {
          console.log("Carpooling  successfully");
         // this.router.navigatdeletee(['dashboardUser/listcovoiturageUser'])
       //   this.cocvoitu = this.cocvoitu.filter((covoiturage :any) => covoiturage.annonceId !=annonceId);
         this.ngOnInit();

        },
        (error) => {
          console.log("Error deleting carpooling:", error);
        }
      );
    }
}