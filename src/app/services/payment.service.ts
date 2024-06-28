import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DataPayment } from '../common/data-payment';
import { UrlPaypalResponse } from '../common/url-paypal-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl:string='http://localhost:8085/api/v1/payments';

  constructor(private http:HttpClient) { }

  getUrlPaypalPayment(dataPayment:DataPayment):Observable<UrlPaypalResponse>{
    //console.log('Header:'+this.headerService.headers.get('Content-Type'))
    return this.http.post<UrlPaypalResponse>(this.apiUrl, dataPayment);
  }
}
