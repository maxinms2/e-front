import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeaderService } from './header.service';
import { BACKEND_URL } from '../config/config';
import { Observable } from 'rxjs';
import { FileRepot } from '../common/file-repot';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  http: any;

  constructor(private httpClient:HttpClient, private headerService : HeaderService ) { }

  private apiUrl : string = BACKEND_URL+"/api/v1/reports";

  reportExcelProducts(): Observable<FileRepot> {
    const headers = this.headerService.getHeader();
    return this.httpClient.get<FileRepot>(`${this.apiUrl}/products`,{headers});
  }
}
