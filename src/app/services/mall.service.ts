import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MallService {

  constructor(private http : HttpClient) {}

  addMall(data: any): Observable<any> {
    return this.http.post('http://localhost:3000/malls', data);
  }

  updateMall(id: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/malls/${id}`, data);
  }

  getMallList(): Observable<any> {
    return this.http.get('http://localhost:3000/malls');
  }

  deleteMall(id: number): Observable<any>{
    return this.http.delete(`http://localhost:3000/malls/${id}`);
  }}
