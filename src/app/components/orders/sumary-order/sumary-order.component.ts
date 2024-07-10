import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataPayment } from 'src/app/common/data-payment';
import { ItemCart } from 'src/app/common/item-cart';
import { Jwtclient } from 'src/app/common/jwtclient';
import { Order } from 'src/app/common/order';
import { OrderProduct } from 'src/app/common/order-product';
import { OrderState } from 'src/app/common/order-state';
import { AlertsService } from 'src/app/services/alerts.service';
import { OrderService } from 'src/app/services/order.service';
import { PaymentService } from 'src/app/services/payment.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-sumary-order',
  templateUrl: './sumary-order.component.html',
  styleUrls: ['./sumary-order.component.css']
})
export class SumaryOrderComponent implements OnInit {

  items: ItemCart[] = [];
  totalCart: number = 0;
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  address: string = '';
  orderProducts: OrderProduct[] = [];
  userId: number = 0;
  token: Jwtclient | null = null;
  isLoading: boolean=false;

  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private router: Router,
    private sessionStorage: SessionStorageService,
    private alerts:AlertsService
  ) { }


  ngOnInit(): void {
    this.isLoading=true;
    console.log('ngOnInit');
    let itemsStorage = [];
    const itemsString = sessionStorage.getItem('items');
    if (itemsString) {
      console.log("itemsString====" + itemsString);
      itemsStorage = JSON.parse(itemsString);
    }

    const tokenString = sessionStorage.getItem('token');
    if (tokenString) {
      try {
        this.token = JSON.parse(tokenString);
      } catch (error) {
        console.error('Error al parsear el token:', error);
      }
    }

    itemsStorage.forEach(
      (item: { productId: number; productName: string; quantity: number; price: number; }) => {
        let itemCart = new ItemCart(item.productId, item.productName, item.quantity, item.price);
        this.items.push(itemCart);
      }
    );
    this.totalCart = this.getTotalCart();
    this.userId = this.sessionStorage.getItem('token').id;
    this.getUserById(this.userId);
    this.isLoading=false;
    /*setTimeout(
      () => {
        this.sessionStorage.removeItem('token');
        this.alerts.warning("Sesión finalizada");
        this.router.navigate(['/user/login']);
      //}, 900000);
      }, 60000);*/
  }

  generateOrder() {
    this.isLoading=true;
    this.items.forEach(
      item => {
        let orderProduct = new OrderProduct(null, item.productId, item.quantity, item.price);
        this.orderProducts.push(orderProduct);
      }
    );

    let order = new Order(null, new Date(), this.orderProducts, this.userId, OrderState.PROGRESS);
    console.log('Order: ' + order.orderState);
    this.orderService.createOrder(order).subscribe(
      data => {
        console.log('Order creada con id: ' + data.id);
        this.sessionStorage.setItem('order', data);
        sessionStorage.removeItem("items");
        this.isLoading=false;
        this.router.navigate(['/payment/success']); 
               
      },
      (error) => {
        if (error.status === 400) {
          this.isLoading=false;
          this.router.navigate(['/']);
          this.alerts.warning(error.error);
        } else {
          this.sessionStorage.removeItem('token');
          this.isLoading=false;
          //location.reload();
          console.error(error.error);
          this.alerts.error("Error de sistema o sesión finalizada. ");
          this.router.navigate(['/']);
        }
      }
    );

    //redireccion y pago con paypal
    /*let urlPayment;
    let dataPayment = new DataPayment('PAYPAL', this.totalCart.toString(), 'USD', 'COMPRA');

    console.log('Data Payment:', dataPayment);

    this.paymentService.getUrlPaypalPayment(dataPayment).subscribe(
      data => {
        urlPayment = data.url;
        console.log('Respuesta exitosa...');
        window.location.href = urlPayment;
      }
    );*/



  }

  deleteItemCart(productId: number) {
    this.items = this.items.filter(item => item.productId !== productId);
    sessionStorage.setItem('items', JSON.stringify(this.items));
    this.totalCart = this.getTotalCart();
  }

  getUserById(id: number) {
    this.userService.getUserById(id).subscribe(
      data => {
        this.firstName = data.firstName;
        this.lastName = data.lastName;
        this.email = data.email;
        this.address = data.address;
      }
    );
  }

  getTotalCart() {
    let totalCart: number = 0;
    this.items.forEach(
      (item, clave) => {
        totalCart += item.getTotalPriceItem();
      }

    );
    return totalCart;
  }

}
