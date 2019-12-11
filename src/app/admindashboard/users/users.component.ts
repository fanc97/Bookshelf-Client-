import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginAuthService } from 'src/app/shared/service/login-auth.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  private page:number=0;
  private pages:Array<number>;

  @ViewChild('username',{static:true}) username:ElementRef;

  public loginuser:any={};
  public users:any=[];
  constructor(private authService:LoginAuthService,private userService:UserService) {
    this.authService.isLoggedIn();
    this.loginuser=JSON.parse(localStorage.getItem('currentUser'));
      
   }

  ngOnInit() {
    this.getUsersPage();
  }
  getUsersPage(){
    this.userService.getUsersPage(this.page,this.loginuser.token).subscribe(users=>{
      this.users=users;
      this.pages=new Array(this.users[0].totalPages);
    })
  }

  setPage(i ,event:any){
    event.preventDefault();
    this.page=i;
    this.getUsersPage();
  }


  getUserByUsername(){
    this.page=0;
    this.userService.getUsersByUsername(this.username.nativeElement.value,this.page,this.loginuser.token).subscribe(response =>{
      this.users=response;
      this.pages=new Array(this.users[0].totalPages);
    })
  }
  deleteUser(userId:number){
    this.userService.deleteUser(userId,this.loginuser.token).subscribe((response)=>{
      this.getUsersPage();
    },
    (error) => console.log(error));
  }
  editRole(userId:number){
    this.userService.editRole(userId,this.loginuser.token).subscribe((response)=>{
      this.getUsersPage();
    },
    (error) => console.log(error));
  }
}
