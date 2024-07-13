import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../common/order';
import { Observable } from 'rxjs';
import { HeaderService } from './header.service';
import { BACKEND_URL } from '../config/config';
import { OrderState } from '../common/order-state';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl : string = BACKEND_URL+"/api/v1/orders";
  private apiUrlAdmin : string = BACKEND_URL+"/api/v1/admin/orders";
  private update: string ='update/state/order';

  constructor(private httpClient:HttpClient, private headerService : HeaderService) { }

  createOrder(order:Order):Observable<Order>{
    const headers = this.headerService.getHeader();
    return this.httpClient.post<Order>(this.apiUrl, order, {headers});
  }

  updateOrder(formData:any):Observable<any>{
    const headers = this.headerService.getHeader();
    return this.httpClient.post(`${this.apiUrl}/${this.update}`, formData, {headers});
  }

  getOrderByUser(userId:number):Observable<Order[]>{
    const headers = this.headerService.getHeader();
    return this.httpClient.get<Order[]>(`${this.apiUrl}/by-user/${userId}`, {headers});
  }

  getOrderById(orderId:number):Observable<Order>{
    const headers = this.headerService.getHeader();
    return this.httpClient.get<Order>(`${this.apiUrl}/${orderId}`, {headers});
  }

  getOrderByStatus(status:OrderState):Observable<Order[]>{
    const headers = this.headerService.getHeader();
    return this.httpClient.get<Order[]>(`${this.apiUrlAdmin}/by-status/${status}`, {headers});
  }

}
