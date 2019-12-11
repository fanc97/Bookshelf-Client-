import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { LoginAuthService } from './shared/service/login-auth.service';
import { UserService } from './shared/service/user.service';
import { BookComponentComponent } from './admindashboard/book-component/book-component.component';
import { UsersComponent } from './admindashboard/users/users.component';
import { AddComponent } from './admindashboard/book-component/add/add.component';
import { BooksComponent } from './userdashboard/books/books.component';

@NgModule({
  declarations: [
    AppComponent,
    UserdashboardComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    AdmindashboardComponent,
    AddComponent,
    BookComponentComponent,
    UsersComponent,
    BooksComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard,LoginAuthService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
