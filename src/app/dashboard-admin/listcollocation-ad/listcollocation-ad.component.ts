import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CollocationService } from '../../services/collocation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listcollocation-ad',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './listcollocation-ad.component.html',
  styleUrl: './listcollocation-ad.component.css'
})
export class ListcollocationAdComponent implements OnInit {
  constructor( private router: Router , private list : CollocationService){}
  collocation : any;
  deleteSuccessMessage: string | null = null;
  ngOnInit(): void {
    this.list.getall().subscribe(
      (res)=>{
        this.collocation=res;
        console.log(res)
      },(err)=>{
        console.log(err)
      }
      
    )
    
  }
  deleteCollocation(id: any) {
    // Call your service method to delete the collocation item by id
    this.list.supprimer(id).subscribe(
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


