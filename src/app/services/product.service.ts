import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { HeaderService } from './header.service';
import { SessionStorageService } from './session-storage.service';
import { BACKEND_URL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private httpClient:HttpClient, private headerService : HeaderService ){}
  
  private apiUrl : string = BACKEND_URL+"/api/v1/admin/products";
  

  getProducts():Observable<Product[]>{
    const headers = this.headerService.getHeader();
    return this.httpClient.get<Product[]>(this.apiUrl,{headers});
  }

  createProduct(formData:any):Observable<any>{
    const headers = this.headerService.getHeader();
    return this.httpClient.post<Product>(this.apiUrl,formData, {headers});
  }

  deleteProductById(id:number):Observable<any>{
    const headers = this.headerService.getHeader();
    return this.httpClient.delete(this.apiUrl+"/"+id , {headers});
  }

  getProductById(id:number):Observable<Product>{
    const headers = this.headerService.getHeader();
    return this.httpClient.get<Product>(this.apiUrl+"/"+id, {headers});
  }
  
}
