import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../model/book.model';
import { map,tap } from 'rxjs/operators';
import { Form } from '@angular/forms';


const baseUrl='http://localhost:8080/api/books';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  
  constructor(private http: HttpClient) { }
  

  createBook(book: any,token:any): Observable<any> {
    const headers = new HttpHeaders({'Authorization':'Bearer '+token});
    return this.http.post(baseUrl, book,{headers: headers});
  }
 
  updateBook(id: number, value: any,token:any): Observable<any> {
    const headers = new HttpHeaders({'Authorization':'Bearer '+token});
    return this.http.put(`${baseUrl}/${id}`, value,{headers: headers});
  }
 
  deleteBook(id: number,token:any): Observable<any> {
    const headers = new HttpHeaders({'Authorization':'Bearer '+token});
    return this.http.delete(`${baseUrl}/${id}`,{headers: headers});
  }
 
  getAllBooks(): Observable<any> {
    return this.http.get(baseUrl);
  }
  getOne(bookId: number,userId:number,token:any): Observable<any> {
    const headers = new HttpHeaders({'Authorization':'Bearer '+token});
    return this.http.get(`${baseUrl}/order?bookId=${bookId}&userId=${userId}`,{headers: headers});
  }
 
  getBookPage(page:number):Observable<any> {
    
    // return this.http.get(baseUrl+'?page='+page,{observe:'response'})
    // .pipe(
    //   tap(response=>console.log(response)),
    //   map(response=>response.body)
    // );
    return this.http.get(baseUrl+'?page='+page);
  }
 
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  saveBookAndImg(formData:FormData):Observable<any>{
    return this.http.post(`${baseUrl}/saveBookAndImg/`,formData);
  }

  getBookByAuthorAndTitle(title:string,author:string,page:number):Observable<any>{
    return this.http.get(`http://localhost:8080/api/books/search?title=${title}&author=${author}&page=${page}`);
  }

}
