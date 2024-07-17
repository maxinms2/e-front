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
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {
  isLoading:boolean=false;
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
    { value: 'CONFIRMED', label: 'EN PROCESO' },
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

    Swal.fire({
      title: '¿Desea cambiar el estatus ?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Modificar estatus',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.saveOrder();
        Swal.fire(
          'Órdenes',
          'Estatus actualizado.',
          'success'
        )
      }else{
        window.location.reload();
      }
    })
    
    
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
    this.isLoading=true;
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
              this.isLoading=false;
            }
          );
        }
        
      },
      error =>{
         this.isLoading=false;
         this.errorsService.redireccionaError(error.error);
      }
    );
  }

  saveOrder() {
    this.isLoading=true;
    let order:Order=new Order(this.id,this.dateCreated ?? new Date(),
    this.orderProducts,this.userId,this.orderState,"","");
    this.orderService.updateStatusOrder(order).subscribe(
        data=>{
          this.alerts.success("Estatus modificado");
          this.isLoading=false;
        },
        error=>this.errorsService.redireccionaError(error.error)
    );

  }
}

