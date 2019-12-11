import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BookService } from '../shared/service/book.service';
import { Book } from '../shared/model/book.model';
import { HttpHeaders, HttpHeaderResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private page:number=0;
  private pages:Array<number>;
  books:Book[];

  @ViewChild('author',{static:true}) author:ElementRef;
  @ViewChild('title',{static:true}) title:ElementRef;
  constructor(private bookService:BookService) { }

  
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
  getBookByTitleAndAuthor(){
    this.page=0;
    console.log(this.author.nativeElement.value);
    console.log(this.title.nativeElement.value);
    this.bookService.getBookByAuthorAndTitle(this.title.nativeElement.value,this.author.nativeElement.value,this.page).subscribe(response =>{
      this.books=response;
      this.pages=new Array(this.books[0].totalPages);
    })
  }

  
}
