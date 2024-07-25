import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLinkActive , RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router){}
  ngOnInit(): void {
   
  }
logout() {
    localStorage.removeItem('token');
    localStorage.clear(); 
    this.router.navigate(["/login"]);
}
}


