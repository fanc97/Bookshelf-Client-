import { Component, OnInit } from '@angular/core';
import { LoginAuthService } from '../shared/service/login-auth.service';
import { UserService } from '../shared/service/user.service';


@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  public loginuser:any={};


  constructor(private authService:LoginAuthService,private userService:UserService) {
    this.authService.isLoggedIn();
    this.loginuser=JSON.parse(localStorage.getItem('currentUser'));
      
   }
   
   
   
  ngOnInit() {
    
  }

}
