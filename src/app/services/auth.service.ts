import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http:HttpClient) { 

  }
  apiurl='http://localhost:3000/user';

  registerUser(inputdata:any){
    return this.http.post(this.apiurl,inputdata)
  }

  login(data):Observable<any>{
    console.log("Hiiii")
    return this.http.post('https://careful-sneeze-production.up.railway.app/api/user/login', data)
  }
  getUserByCode(id:any){
    return this.http.get(this.apiurl+'/'+id);
  }
  getAll(){
    return this.http.get(this.apiurl);
  }
  updateUser(id:any,inputdata:any){
    return this.http.put(this.apiurl+'/'+id,inputdata);
  }
  getUserRole(){
    return this.http.get('this.apiurl/role');
  }
  isLoggedIn(){
    return sessionStorage.getItem('username')!=null;
  }
  getRole(){
    return sessionStorage.getItem('role')!=null?sessionStorage.getItem('role')?.toString():'';
  }
  getAllCustomer(){
    return this.http.get('this.apiurl/customer');
  }
  getAccessByRole(role:any,menu:any){
    return this.http.get('this.apiurl/roleaccess?role='+role+'&menu='+menu)
  }
}
