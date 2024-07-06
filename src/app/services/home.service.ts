import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { BACKEND_URL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl : string = BACKEND_URL+'/api/v1/home';

  constructor(private httpClient:HttpClient) { }

  getProducts():Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.apiUrl);
  }

  getProductById(id:number):Observable<Product>{
    console.log('url---------------------'+this.apiUrl);
    
    return this.httpClient.get<Product>(this.apiUrl+"/"+id);
  }
}
