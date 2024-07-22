import { Injectable } from '@angular/core';
import { BACKEND_URL } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CounterVisitsService {
  private apiUrl: string = BACKEND_URL+'/api/v1/counter';
  constructor(private http:HttpClient) { }

  getCounter():Observable<string>{
    return this.http.get<string>(this.apiUrl+"/get");
  }

  setCounter():Observable<string>{
    return this.http.get<string>(this.apiUrl + "/set");
  }
}
