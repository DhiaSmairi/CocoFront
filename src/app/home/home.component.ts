import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../dashboard-admin/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CovoiturageService } from '../services/covoiturage.service';
//import { CollationOptions } from 'mongodb';
import { CollocationService } from '../services/collocation.service';
import { ClaimsService } from '../services/claims.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent,FormsModule,RouterLink,RouterLinkActive,FormsModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  user:any;
  collocation:any;
  covoiturage:any
  claims:any
  constructor(private auth:AuthService,private covoiturageService:CovoiturageService,private collocationService:CollocationService,private claimsService:ClaimsService){

  }
ngOnInit(): void {
this.listClaims();
this.listCollocation();
this.listCovoiturage()
this.listUsers();
}
listUsers(){
  this.auth.getall().subscribe(
    (res)=>{
      this.user=res;
      console.log(res)
    },(err)=>{
      console.log(err)
    }
    
  )
}
  listCovoiturage(){
    this.covoiturageService.getall().subscribe(
      (res)=>{
        this.covoiturage=res;
        console.log(res)
      },(err)=>{
        console.log(err)
      }
      
    )
}
listCollocation(){
  this.collocationService.getall().subscribe(
    (res)=>{
      this.collocation=res;
      console.log(res)
    },(err)=>{
      console.log(err)
    }
    
  )
}
listClaims(){
  this.claimsService.GetALLClaims().subscribe(
    (res)=>{
      this.claims=res;
      console.log(res)
    },(err)=>{
      console.log(err)
    }
    
  )
}
}
