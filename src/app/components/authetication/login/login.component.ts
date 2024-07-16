import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Userdto } from 'src/app/common/userdto';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  username : string = '';
  password : string = '';


  ngOnInit(): void {

  }

  constructor(private authentication : AuthenticationService, 
    private sessionStorage : SessionStorageService,
    private router: Router, private toastr:ToastrService,private alerts:AlertsService
    ){

  }

  login(){
    let userDto = new Userdto(this.username, this.password);
    this.authentication.login(userDto).subscribe(
      token => {
        console.log(token);
        this.sessionStorage.removeItem('token');
        this.sessionStorage.setItem('token', token);
        if(token.type == 'ADMIN'){
          this.router.navigate(['/admin/orders']);
        }else{
          this.router.navigate(['/']);
        }
        //this.toastr.success('Usuario registrado correctamente');
      },
       (error) => {
        if (error.status !== 401) {
          //this.toastr.error('Error inesperado');
          //this.toastr.error('Usuario o contraseña incorrectos');
          this.alerts.error('Error inesperado');
        } else {
          this.alerts.warning('Usuario o contraseña incorrectos');
        } 
      }
    );
    console.log(userDto);
  }



}
