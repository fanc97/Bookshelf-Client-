import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { LoginAuthService } from 'src/app/shared/service/login-auth.service';
import { Book } from 'src/app/shared/model/book.model';
import { BookService } from 'src/app/shared/service/book.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {
  private page:number=0;
  private pages:Array<number>;

  @ViewChild('author',{static:true}) author:ElementRef;
  @ViewChild('title',{static:true}) title:ElementRef;

  books:Book[];
  public loginuser:any={};
  bookUpdate:Book =new Book();
  info:boolean=false;
  constructor(private bookService:BookService,private authService:LoginAuthService,private userService:UserService) {
    this.authService.isLoggedIn();
    this.loginuser=JSON.parse(localStorage.getItem('currentUser'));
      
   }

  ngOnInit() {
    this.getBooks();
  }

  getBooks(){
    this.bookService.getBookPage(this.page).subscribe(response =>{
      this.books=response;
      this.pages=new Array(this.books[0].totalPages);
    })
  }
  setPage(i ,event:any){
    event.preventDefault();
    this.page=i;
    this.getBooks();
  }
  
  
  bookForOrder(bookId:number){
    console.log(this.loginuser);
    this.bookService.getOne(bookId,this.loginuser.user.id,this.loginuser.token).subscribe((response)=>{
      this.info=true;

    this.getBooks();
    });
  }
  finishOrder(){
    this.info=false;
  }

  getBookByTitleAndAuthor(){
    this.page=0;
    this.bookService.getBookByAuthorAndTitle(this.title.nativeElement.value,this.author.nativeElement.value,this.page).subscribe(response =>{
      this.books=response;
      this.pages=new Array(this.books[0].totalPages);
    })
  }
}
