import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AddComponent }from './admindashboard/book-component/add/add.component';
import { BookComponentComponent }from './admindashboard/book-component/book-component.component';
import { AuthGuard } from './auth.guard';
import { UsersComponent } from './admindashboard/users/users.component';
import { BooksComponent } from './userdashboard/books/books.component';


const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'admindashboard',component:AdmindashboardComponent,canActivate:[AuthGuard]},
  {path:'userdashboard',component:UserdashboardComponent,canActivate:[AuthGuard]},
  {path:'userdashboard/books',component:BooksComponent,canActivate:[AuthGuard]},
  {path:'admindashboard/books',component:BookComponentComponent,canActivate:[AuthGuard]},
  {path:'admindashboard/books/add',component:AddComponent,canActivate:[AuthGuard]},
  {path:'admindashboard/users',component:UsersComponent,canActivate:[AuthGuard]},
  

  {path:'**',pathMatch:'full',redirectTo:'home'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
