import { Component, OnInit } from '@angular/core';
import { Jwtclient } from 'src/app/common/jwtclient';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {

  token: Jwtclient | null = null;

  constructor(private sessionStorage: SessionStorageService) {
  }

  ngOnInit(): void {
    const tokenString = sessionStorage.getItem('token');
    if (tokenString) {
      try {
        this.token = JSON.parse(tokenString);
      } catch (error) {
        console.error('Error al parsear el token:', error);
      }
    }
  }




}
