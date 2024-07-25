import { Component,OnInit } from '@angular/core';
import { CollocationService } from '../../services/collocation.service';
import { Router,ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-collocation',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './update-collocation.component.html',
  styleUrl: './update-collocation.component.css'
})
export class UpdateCollocationComponent implements OnInit {
  collocation={
    "date_dispo": "",
    "nbre_chmbre": 0,
    "descrption": "",
    "nbre_person": 0,
    "typeLogement": "",
    "typeAnnoColloc": "",
    "userId": 1,
    "montant": 0
  }
  constructor(private collocationservice  : CollocationService , private router : Router,private route:ActivatedRoute){}
response:any
id:any
list:any
  ngOnInit(): void {
    this.id=this.route.snapshot.paramMap.get('id');
    this.collocationservice.getbyid(this.id)
    .subscribe(
      
      (res)=>{
       this.response=res,
       this.collocation=this.response
     console.log("aa"+this.collocation.montant)
     },
     (err)=>{
      console.log(err);

    }
  )
}
update(){
  let f =new FormData();
  f.append('date_dispo',this.collocation.date_dispo);
  f.append('nbre_chmbre',this.collocation.nbre_chmbre.toString());
  f.append("description",this.collocation.descrption);
  f.append("nbre_person",this.collocation.nbre_person.toString());
  f.append("typeLogement",this.collocation.typeLogement);
  f.append("typeAnnoColloc",this.collocation.typeAnnoColloc);
  f.append("montant",this.collocation.montant.toString());
  this.collocationservice.modifier(this.id,f).subscribe(
    ( res)=>{
       console.log(res);

       this.router.navigate(['/dashboard/listroom'])
     },
     err=>{
       console.log(err);

     }
   )
}

  }



