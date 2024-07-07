import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../common/user';
import { HeaderService } from './header.service';
import { BACKEND_URL } from '../config/config';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {


  //constructor(private httpClient:HttpClient, private headerService: HeaderService) { }

  success(mensaje:string){
    Swal.fire({
      text: mensaje,
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí puedes colocar el código que debe ejecutarse después de que el usuario haga clic en "Aceptar"
        console.log(mensaje);
      }
    });
  }

  error(mensaje:string){
    Swal.fire({
      text: mensaje,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      // Aquí puedes colocar el código que debe ejecutarse después de que el usuario haga clic en "Aceptar"
      console.log(mensaje);
    });
  }

  warning(mensaje:string){
    Swal.fire({
      text: mensaje,
      icon: 'warning',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      // Aquí puedes colocar el código que debe ejecutarse después de que el usuario haga clic en "Aceptar"
      console.log(mensaje);
    });
  }


}
