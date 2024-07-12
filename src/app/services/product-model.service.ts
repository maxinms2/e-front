import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeaderService } from './header.service';
import { BACKEND_URL } from '../config/config';
import { ProductModel } from '../common/product-model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductModelService {

  constructor(private httpClient:HttpClient, private headerService : HeaderService ){}
  
  private apiUrl : string = BACKEND_URL+"/api/v1/admin/product-model";

  getProducts():Observable<ProductModel[]>{
    const headers = this.headerService.getHeader();
    return this.httpClient.get<ProductModel[]>(this.apiUrl,{headers});
  }

  createProduct(formData:any):Observable<any>{
    const headers = this.headerService.getHeader();
    return this.httpClient.post<ProductModel>(this.apiUrl,formData, {headers});
  }

  deleteProductById(id:number):Observable<any>{
    const headers = this.headerService.getHeader();
    return this.httpClient.delete(this.apiUrl+"/"+id , {headers});
  }

  getProductById(id:number):Observable<ProductModel>{
    const headers = this.headerService.getHeader();
    return this.httpClient.get<ProductModel>(this.apiUrl+"/"+id, {headers});
  }
}
