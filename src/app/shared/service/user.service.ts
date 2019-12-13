import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  
  saveUser(user:any):Observable<any>{
    const headers = new HttpHeaders({'Access-Controll-Allow-Origin':'*'});
    return this.http.post("http://localhost:8080/api/register",user,{headers: headers})
  }

  loginUser(user:any):Observable<any>{
    const headers = new HttpHeaders({'Access-Controll-Allow-Origin':'*'});
    return this.http.post("http://localhost:8080/api/auth/login",user,{headers: headers})
  }



  getUser(token:any):Observable<any>{
    const headers = new HttpHeaders({'Authorization':'Bearer '+token});
    return this.http.get("http://localhost:8080/api/users/getuser",  {headers: headers})
  }

  getUsersPage(page:number,token:any):Observable<any> {
    const headers = new HttpHeaders({'Authorization':'Bearer '+token});
    return this.http.get('http://localhost:8080/api/auth/users?page='+page,{headers:headers});
  }
  getUsersByUsername(username:string,page:number,token:any):Observable<any> {
    const headers = new HttpHeaders({'Authorization':'Bearer '+token});
    return this.http.get(`http://localhost:8080/api/auth/users/search?username=${username}&page=${page}`,{headers:headers});
  }


  saveUserProfile(formData:FormData):Observable<any>{
    return this.http.post("http://localhost:8080/api/register/file",formData);
  }
  deleteUser(id:number,token:any):Observable<any>{
    const headers = new HttpHeaders({'Authorization':'Bearer '+token});
    return this.http.delete(`http://localhost:8080/api/auth/delete/${id}`, {headers:headers})
  }
  editRole(id:number,user,token:any):Observable<any>{
    const headers = new HttpHeaders({'Authorization':'Bearer '+token});
    return this.http.get(`http://localhost:8080/api/auth/editrole/${id}`,user, {headers:headers})
  }
}
