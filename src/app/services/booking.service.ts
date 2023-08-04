import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class BookingService {

  
  constructor(private http : HttpClient) {}

  apiurl='http://localhost:3000/bookings';

  addBooking(data: any): Observable<any> {
    return this.http.post(this.apiurl, data);
  }

  updateBooking(id: number, data: any): Observable<any> {
    return this.http.put(`http://localhost:3000/bookings/${id}`, data);
  }

  getBookingList(): Observable<any> {
    return this.http.get('http://localhost:3000/bookings');
  }

  deleteBooking(id: number): Observable<any>{
    return this.http.delete(`http://localhost:3000/bookings/${id}`);
  }
}

