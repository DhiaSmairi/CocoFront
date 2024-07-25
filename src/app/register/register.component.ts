import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  constructor(private authService: AuthService,private router:Router) { }
  ngOnInit(): void {

  }
  user ={
    username:'',
    email : '',
    password:''
  }
  register(){
    console.log(this.user)
    this.authService.register(this.user).subscribe(
      (response) => {
        this.authService.AddRole(this.user.username, 'User');
        console.log('User registered successfullyy:', response);
        this.router.navigate(['/login'])
        console.log('User registered successfully:', response);
     
      },
      (error) => {
        console.error('Error registering user:', error);
    
    })
  
  }

}
