import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ParkingSlotService {

  constructor(private http : HttpClient) {}

  apiUrl= environment.apiUrl + '/slots'

  addSpot(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  updateSpot(id: number, data: any): Observable<any> {
    return this.http.put(this.apiUrl+'/'+id, data);
  }

  getSpotList(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  deleteSpot(id: number): Observable<any>{
    return this.http.delete(this.apiUrl+'/'+id);
  }
}

