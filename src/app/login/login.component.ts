import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/service/user.service';
import { Router } from '@angular/router';
import { LoginAuthService } from '../shared/service/login-auth.service';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user:any={};


  
  constructor(private userService:UserService,private route:Router,private authService:LoginAuthService) { 
    this.authService.isLoggedIn();
  }

  ngOnInit() {
  }
  loginUser(user:any){
    this.userService.loginUser(user).subscribe((response) =>{
      if(response){
        if(response.token){
          console.log(response);
          
          localStorage.setItem('currentUser',JSON.stringify(response));
          // if(response.user.role==='ADMIN'){
            if(response.user.userAuthority[0].authority==='ROLE_ADMIN'){
            this.route.navigate(['/admindashboard']);
          }else{
            this.route.navigate(['/userdashboard']);
          }
        }
      }
    })
  }
}
