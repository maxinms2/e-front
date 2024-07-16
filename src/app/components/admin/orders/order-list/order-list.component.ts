import { Component, OnInit } from '@angular/core';
import { OrderDTO } from 'src/app/common/order-dto';
import { OrderState } from 'src/app/common/order-state';
import { ErrorsService } from 'src/app/services/errors.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit{

  constructor(private orderService:OrderService,private errorsService:ErrorsService){}
  orderStateDescriptions: { [key: string]: string } = {
    'CONFIRMED': 'ORDENES EN PROCESO DE ENTREGA',
    'CANCELLED': 'ORDENES CANCELADAS',
    'DELIVERED': 'ORDENES ENTREGADAS',
  };
  stateDescription: { [key: string]: string } = {
    'CONFIRMED': 'EN PROCESO',
    'CANCELLED': 'CANCELADA',
    'DELIVERED': 'ENTREGADA',
  };
  orderStates = Object.values(OrderState);
  orders :OrderDTO[]=[];
  selectedOrderState: OrderState=this.orderStates[0];
  isLoading: boolean=false;

  ngOnInit(): void {

    this.selectedOrderState = this.orderStates[0];
    this.fillTable();
  }

  fillTable(){
    this.isLoading=true;
    this.orderService.getOrderByStatus(this.selectedOrderState).subscribe(
      data => {
        this.orders = data; 
        this.isLoading=false;    
      },
        error=>{
          this.isLoading=false;
          this.errorsService.redireccionaError(error.error);
        }
    );
  }

  onOrderStateChange(event: any): void {
    this.selectedOrderState = event.target.value;
    console.log('Selected Order State:', this.selectedOrderState);
    this.fillTable();
  }


}
