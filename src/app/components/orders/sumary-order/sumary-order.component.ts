import { Component, OnInit } from '@angular/core';
import { ItemCart } from 'src/app/common/item-cart';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sumary-order',
  templateUrl: './sumary-order.component.html',
  styleUrls: ['./sumary-order.component.css']
})
export class SumaryOrderComponent implements OnInit {

  items : ItemCart [] = [];
  totalCart : number =0;
  firstName : string = '';
  lastName : string = '';
  email : string = '';
  address : string ='';
  /*orderProducts:OrderProduct [] = [];
  userId : number =0;*/

  constructor(private cartService:CartService 
    ,private userService:UserService, 
    /*private orderService:OrderService, 
    private paymentService:PaymentService,
    private sessionStorage:SessionStorageService*/
    ){}

  ngOnInit(): void {
    this.actualizaItems();
    this.getUserById(2);
  }

  deleteItemCart(productId:number){
    this.cartService.deleteItemCart(productId);
    this.actualizaItems();
  }

  private actualizaItems() {
    this.items = this.cartService.convertToListFromMap();
    this.totalCart = this.cartService.totalCart();
  }

  getUserById(id:number){
    this.userService.getUserById(id).subscribe(
      data => {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.address = data.address;
      }
    );
  }

}
