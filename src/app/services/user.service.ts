import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../common/user';
import { HeaderService } from './header.service';
import { BACKEND_URL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl: string = BACKEND_URL+'/api/v1/users';

  constructor(private httpClient:HttpClient, private headerService: HeaderService) { }

  getUserById(id:number):Observable<User>{
    const headers = this.headerService.getHeader();
    return this.httpClient.get<User>(`${this.apiUrl}/${id}`, {headers});
  }


}
