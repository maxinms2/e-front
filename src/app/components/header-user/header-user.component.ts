import { Component, OnInit } from '@angular/core';
import { Jwtclient } from 'src/app/common/jwtclient';
import { CartService } from 'src/app/services/cart.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {

  token: Jwtclient | null = null;

  constructor(private sessionStorage: SessionStorageService,private cartService: CartService) {
  }
  cartItemCount  = 0;
  ngOnInit(): void {
    const tokenString = sessionStorage.getItem('token');
    if (tokenString) {
      try {
        this.token = JSON.parse(tokenString);
      } catch (error) {
        console.error('Error al parsear el token:', error);
      }
    }
    this.cartService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    });
  }




}
