import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http : HttpClient) {}

  apiUrl= environment.apiUrl + '/employees';

  addEmployee(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateEmployee(id: number, data: any): Observable<any> {
    return this.http.put(this.apiUrl+'/'+id, data);
  }

  getEmployeeList(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  deleteEmployee(id: number): Observable<any>{
    return this.http.delete(this.apiUrl+'/'+id);
  }
}
