import { Component } from '@angular/core';
import { LoginAuthService } from './shared/service/login-auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public loginuser:any={};

  public currentStatus:any;
  constructor(private authService:LoginAuthService,private route:Router) { 
    this.loginuser=JSON.parse(localStorage.getItem('currentUser'));
    this.currentStatus=this.authService.getSutatus().subscribe(currentStatus=>{
      this.currentStatus=currentStatus;
    })
  }
  logout(){
    localStorage.removeItem('currentUser');
    this.route.navigate(['login']);
  }
}
