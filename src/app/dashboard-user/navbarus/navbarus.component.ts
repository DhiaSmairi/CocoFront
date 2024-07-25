import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbarus',
  standalone: true,
  imports: [RouterLinkActive , RouterLink,FormsModule,CommonModule],
  templateUrl: './navbarus.component.html',
  styleUrl: './navbarus.component.css'
})
export class NavbarusComponent implements OnInit {
  constructor(private router: Router,private authService:AuthService){}
  user:any
  ngOnInit(): void {
   this.getCurrentUser()
  }
  getCurrentUser(){
    this.authService.getCurrentUser().subscribe({
      next:(data)=>{
        console.log(data);
        this.user=data.id
        console.log(this.user);
      },
      error(err) {
        console.log(err)
        
      },
    })}
  logout() {
    localStorage.removeItem('token');
    localStorage.clear(); 
    this.router.navigateByUrl('/login')
}
}
