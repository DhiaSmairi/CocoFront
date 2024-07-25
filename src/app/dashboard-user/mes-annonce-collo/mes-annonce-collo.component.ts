import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CollocationService } from '../../services/collocation.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mes-annonce-collo',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './mes-annonce-collo.component.html',
  styleUrl: './mes-annonce-collo.component.css'
})
export class MesAnnonceColloComponent implements OnInit {
  id:any
  collocations:any
  deleteSuccessMessage:any
  constructor(private route:ActivatedRoute,private collocationservice:CollocationService){

  }
  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id');
    this.collocationservice.getAnnoncesByUser(this.id).subscribe(
      (res)=>{
        this.collocations= res;
        console.log(res)
      },
      (err)=>{
        console.log(err)
      }
  
    )
   
  }
  deleteCollocation(id: any) {
    // Call your service method to delete the collocation item by id
    this.collocationservice.supprimer(id).subscribe(
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
