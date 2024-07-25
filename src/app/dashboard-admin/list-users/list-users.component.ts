import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent implements OnInit {
  users:any
  constructor( private router: Router , private auth : AuthService){}
  ngOnInit(): void {
    this.auth.getall().subscribe(
      (res)=>{
        this.users=res;
        console.log(res)
      },(err)=>{
        console.log(err)
      }
      
    )

}

}
