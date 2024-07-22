import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { BACKEND_URL } from '../config/config';
import { ProductCategoryName } from '../common/product-category-name';
import { Category } from '../common/category';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private apiUrl : string = BACKEND_URL+'/api/v1/home';

  constructor(private httpClient:HttpClient) { }

  getProducts():Observable<Product[]>{
    return this.httpClient.get<Product[]>(this.apiUrl);
  }

  getProductsCategoryName(productCategoryName:ProductCategoryName):Observable<Product[]>{
    return this.httpClient.post<Product[]>(this.apiUrl,productCategoryName);
  }

  getProductById(id:number):Observable<Product>{
    console.log('url---------------------'+this.apiUrl);
    
    return this.httpClient.get<Product>(this.apiUrl+"/"+id);
  }

  getCategoryList():Observable<Category[]>{
    return this.httpClient.get<Category[]>(this.apiUrl+"/categories");
  }
}
