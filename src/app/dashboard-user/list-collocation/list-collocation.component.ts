import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CollocationService } from '../../services/collocation.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-collocation',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './list-collocation.component.html',
  styleUrl: './list-collocation.component.css'
})
export class ListCollocationComponent  implements OnInit {
  public url='http://localhost:9093/'
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
 /* formData: FormData = new FormData();

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.formData.append('image', file);
    }
  }*/
}
