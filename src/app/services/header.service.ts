import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  //private token = '';
  //public headers : HttpHeaders = new HttpHeaders;

  constructor(private sessionStorage: SessionStorageService) {

  }

  getHeader(): HttpHeaders {
    //headers : HttpHeaders = new HttpHeaders;
    //if (this.sessionStorage.getItem('token') != null) {
    //console.log('HeaderService: ' + this.sessionStorage.getItem('token'));
    let token:string='';
    if (this.sessionStorage.getItem('token') != null){
      token = this.sessionStorage.getItem('token').token;
    }
    console.log("toke header=====" + token);
    return new HttpHeaders(
      {
        ///'Content-Type' : 'application/json',
        'Authorization': `${token}`

      }

    );

    //}
  }
}
