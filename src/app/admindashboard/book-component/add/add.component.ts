import { Component, OnInit } from '@angular/core';
import { BookService } from 'src/app/shared/service/book.service';
import { LoginAuthService } from 'src/app/shared/service/login-auth.service';
import { UserService } from 'src/app/shared/service/user.service';
import { Book } from 'src/app/shared/model/book.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public userFile:any= File;

  books:Book[];
  book:Book = new Book();
  submitted = false;
  public loginuser:any={};
  constructor(private bookService:BookService,private authService:LoginAuthService,private userService:UserService) {
    this.authService.isLoggedIn();
    this.loginuser=JSON.parse(localStorage.getItem('currentUser'));
      
   }
  ngOnInit() {
  }

  getBooks():void{
    this.bookService.getAllBooks().subscribe((booksData)=>this.books= booksData)
  }

  save(){
    
    this.bookService.createBook(this.book,this.loginuser.token).subscribe(data=>{
      console.log(data);
      this.submitted=true;
      this.reset();
      this.getBooks();
    },
    error => console.log(error));
  }

  onSubmit(){
    this.save();
  }
  private reset(){
    this.book.id=null;
    this.book.title=null;
    this.book.author=null;
    
  }
  newBook():void{
    this.book= new Book();
    this.submitted=false;
  }
}
