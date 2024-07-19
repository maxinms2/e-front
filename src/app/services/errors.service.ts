import { Injectable } from '@angular/core';
import { AlertsService } from './alerts.service';
import { Router } from '@angular/router';
import { SessionStorageService } from './session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor(private alerts:AlertsService,   private router: Router,
    private sessionStorage: SessionStorageService,) { }

  redireccionaError(error:string){
    console.log("error======"+error);
    this.alerts.warning("Sesión finalizada, ingrese nuevamente");
    this.sessionStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }
}
