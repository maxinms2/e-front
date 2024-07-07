import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/common/user';
import { UserType } from 'src/app/common/user-type';
import { AlertsService } from 'src/app/services/alerts.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  username: string = '';
  name: string = '';
  surname: string = '';
  email: string = '';
  address: string = '';
  cellphone: string = '';
  password: string = '';
  password2: string = '';
  userType: string = '';
  errors: any = {};

  ngOnInit(): void {
  }

  constructor(private authetication: AuthenticationService, private router: Router,
    private alerts:AlertsService
  ) { }

  register() {
    this.username = this.email;
    this.userType = UserType.USER
    let user = new User(0, this.username, this.name, this.surname, this.email, this.address,
       this.cellphone, this.password, this.userType,this.password2);
    this.authetication.register(user).subscribe(
      res => {
        //this.toastr.success('Usuario registrado', 'Usuario');
        this.alerts.success('Usuario registrado');
        console.log(res)
        console.log(user);
        this.router.navigate(['user/login']);
      },
      error=>{
        if (error.status === 400) {
          this.errors = error.error;
        }
        //this.toastr.error('Error al registrar usuario');
      }
    );



  }

}
