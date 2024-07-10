import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '../common/category';
import { Observable } from 'rxjs';
import { HeaderService } from './header.service';
import { BACKEND_URL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl: string = BACKEND_URL+'/api/v1/admin/categories';

  constructor(private http:HttpClient, private headerService : HeaderService) { }

  getCategoryList():Observable<Category[]>{
    const headers = this.headerService.getHeader();
    return this.http.get<Category[]>(this.apiUrl, {headers});
  }

  createCategory(category:Category):Observable<Category>{
    const headers = this.headerService.getHeader();
    return this.http.post<Category>(this.apiUrl,category, {headers});
  }

  deleteCategoryById(id:number):Observable<any>{
    const headers = this.headerService.getHeader();
    return this.http.delete(`${this.apiUrl}/${id}`, {headers});
  }

  getCategoryById(id:number):Observable<Category>{
    const headers = this.headerService.getHeader();
    return this.http.get<Category>(`${this.apiUrl}/${id}`, {headers});

  }
  
}
