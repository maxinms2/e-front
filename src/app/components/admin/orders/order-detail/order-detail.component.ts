import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Order } from 'src/app/common/order';
import { OrderProduct } from 'src/app/common/order-product';
import { OrderState } from 'src/app/common/order-state';
import { User } from 'src/app/common/user';
import { AlertsService } from 'src/app/services/alerts.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  id: number = 0;
  dateCreated: Date|null = null;
  userId: number = 0;
  orderState: OrderState = OrderState.CONFIRMED;
  orderProducts: OrderProduct[] = [];
  totalOrder: number = 0;

  clientName: string = '';
  email: string = '';
  cellphone: string = '';

  options = [
    { value: 'CANCELLED', label: 'CANCELADA' },
    { value: 'CONFIRMED', label: 'CONFIRMADA' },
    { value: 'DELIVERED', label: 'ENTREGADA' }
  ];
  selectedOption: string='';

  constructor(private router: Router, private orderService: OrderService
    , private activatedRoute: ActivatedRoute, private errorsService: ErrorsService,
    private userService: UserService,private alerts:AlertsService
  ) { };

  ngOnInit(): void {
    this.getOrder();
    console.log("client00========" + this.userId);

  }

  onSelectionChange(value: string) {
    this.selectedOption = value;
    if(value=='CONFIRMED'){
      this.orderState=OrderState.CONFIRMED;
    }else if(value=='CANCELLED'){
      this.orderState=OrderState.CANCELLED;
    }else{
      this.orderState=OrderState.DELIVERED
    }
    console.log("radio button==="+this.selectedOption);
  }

  getTotalOrden() {
    this.totalOrder = 0;
    for (const product of this.orderProducts) {
      this.totalOrder += product.price * product.quantity;
    }
  }

  getUser() {
    console.log("client========" + this.userId);
    this.userService.getUserById(this.userId).subscribe(
      data => {
        this.clientName = data.firstName + ' ' + data.lastName;
        this.email = data.email;
        this.cellphone = data.cellphone;
      }
    )
  }

  getOrder() {
    this.activatedRoute.params.subscribe(
      order => {
        this.id = order['id'];
        if (this.id) {
          console.log('el valor de la variable id es: ' + this.id);
          this.orderService.getOrderById(this.id).subscribe(
            data => {
              this.id = data.id ?? 0;
              this.dateCreated = data.dateCreated;
              this.userId = data.userId
              this.orderState = data.orderState;
              this.selectedOption=data.orderState.toString();
              this.orderProducts = data.orderProducts;
              console.log("Products===" + this.orderProducts.length);
              this.getUser();
              this.getTotalOrden();
            }
          );
        }

      },
      error => this.errorsService.redireccionaError(error.error)
    );
  }

  saveOrder() {
    let order:Order=new Order(this.id,this.dateCreated ?? new Date(),
    this.orderProducts,this.userId,this.orderState);
    this.orderService.updateStatusOrder(order).subscribe(
        data=>this.alerts.success("Estatus modificado"),
        error=>this.errorsService.redireccionaError(error.error)
    );
   /* let order = new Order(this.id, this.dateCreated, this.orderProducts, this.userId, OrderState.PROGRESS);
    this.orderService.createOrder(order).subscribe(
      data => {
        console.log('Order creada con id: ' + data.id);
        /*this.sessionStorage.setItem('order', data);
        sessionStorage.removeItem("items");
        this.isLoading=false;
        this.router.navigate(['/payment/success']); 

      },
      (error) => {
        /*if (error.status === 400) {
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
        this.errorsService.redireccionaError(error.error);
      }
    );*/
  }
}
