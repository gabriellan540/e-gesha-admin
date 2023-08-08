import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  
  constructor(private http : HttpClient) {}

  apiUrl= environment.apiUrl + '/bookings';

  addBooking(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateBooking(id: number, data: any): Observable<any> {
    return this.http.put(this.apiUrl+'/'+id, data);
  }

  getBookingList(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  deleteBooking(id: number): Observable<any>{
    return this.http.delete(this.apiUrl+'/'+id);
  }
}

