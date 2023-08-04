import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkingSlotService {

  constructor(private _http : HttpClient) {}

  addSpot(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/slots', data);
  }

  updateSpot(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/slots/${id}`, data);
  }

  getSpotList(): Observable<any> {
    return this._http.get('http://localhost:3000/slots');
  }

  deleteSpot(id: number): Observable<any>{
    return this._http.delete(`http://localhost:3000/slots/${id}`);
  }
}

