import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Book } from '../../shared/model/book.model';
import { BookService } from '../../shared/service/book.service';
import { LoginAuthService } from 'src/app/shared/service/login-auth.service';
import { UserService } from 'src/app/shared/service/user.service';
@Component({
  selector: 'app-book-component',
  templateUrl: './book-component.component.html',
  styleUrls: ['./book-component.component.css']
})
export class BookComponentComponent implements OnInit {

  private page:number=0;
  private pages:Array<number>;

  @ViewChild('author',{static:true}) author:ElementRef;
  @ViewChild('title',{static:true}) title:ElementRef;

  books:Book[];
  bookUpdate:Book =new Book();
  book:Book = new Book();
  submitted = false;

  

  forUpdate=false;

  updated=false;

  public loginuser:any={};
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

  private reset(){
    this.book.id=null;
    this.book.title=null;
    this.book.author=null;
    
  }
  /*Delete */
  deleteBook(bookId:number){
    this.bookService.deleteBook(bookId,this.loginuser.token).subscribe((response)=>{
      this.getBooks();
    },
    (error) => console.log(error));
  }

/* Update*/
  clickForUpdate(bookId:number){
    this.forUpdate=true;
    this.bookUpdate.id=bookId;
  }
  updateBook(){
    this.bookService.updateBook(this.bookUpdate.id,this.bookUpdate,this.loginuser.token).subscribe(data=>{
      this.forUpdate=false;
      this.updated=true;
      this.reset();
      this.getBooks();
    },
    error => console.log(error));
  }
  finishUpdate(){
    this.book= new Book();
    this.updated=false;
  }

  getBookByTitleAndAuthor(){
    this.page=0;
    this.bookService.getBookByAuthorAndTitle(this.title.nativeElement.value,this.author.nativeElement.value,this.page).subscribe(response =>{
      this.books=response;
      this.pages=new Array(this.books[0].totalPages);
    })
  }

}
