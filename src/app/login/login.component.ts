import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink,RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  constructor(private authService: AuthService,private router:Router){}
  public jwToken!: string;
  private helper = new JwtHelperService();
  public loggedUser!:string;
public isloggedIn: Boolean = false;
public roles!:string[];
  err:number = 0;
  user ={
    username:'',
    password:''
  }
  ngOnInit(): void {
  }
  decodeJWT(){
    if (this.jwToken == undefined)
     return;
  let decodedToken = this.helper.decodeToken(this.jwToken);
  this.roles = decodedToken.roles;
  this.loggedUser = decodedToken.sub;
console.log("de"+decodedToken)
console.log("MM"+this.roles+this.loggedUser);
}
getCurrentUser(){
  this.roles=this.authService.getRoles();
console.log(this.roles);
this.authService.getCurrentUser().subscribe({
  next:(data)=>{
    console.log(data);
  }
})
}
   onLoggedin(){
this.authService.login(this.user).subscribe({
next: (data) => {
this.jwToken = data.headers.get('Authorization')!;
this.authService.saveToken(this.jwToken);
this.getCurrentUser()
if(this.roles.includes('Admin')){
  this.router.navigate(['/dashboardAdmin/listCovoiturageAd']);
}else{
this.router.navigate(['/dashboardUser/Maps']);
}
},
error: (err: any) => {
this.err = 1;
}
});
}
}
