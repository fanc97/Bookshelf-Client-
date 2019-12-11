import { Component, OnInit } from '@angular/core';
import { LoginAuthService } from '../shared/service/login-auth.service';
import { UserService } from '../shared/service/user.service';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

  public loginuser:any={};
 

  constructor(private authService:LoginAuthService,private userService:UserService) {

    this.authService.isLoggedIn();
    this.loginuser=JSON.parse(localStorage.getItem('currentUser'));

   }

  ngOnInit() {

   
  }

}
