import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MallService {

  constructor(private http : HttpClient) {}

  apiUrl= environment.apiUrl + '/malls';

  addMall(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateMall(id: number, data: any): Observable<any> {
    return this.http.put(this.apiUrl+'/'+id, data);
  }

  getMallList(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  deleteMall(id: number): Observable<any>{
    return this.http.delete(this.apiUrl+'/'+id);
  }}
