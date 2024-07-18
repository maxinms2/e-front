import { Component, OnInit } from '@angular/core';
import { OrderDTO } from 'src/app/common/order-dto';
import { OrderPage } from 'src/app/common/order-page';
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
  orderPage:OrderPage=new OrderPage(OrderState.CONFIRMED,'','',0,3);

  currentPage: number = 1; // Página actual
  itemsPerPage: number = 2; // Número de elementos por página (ajustable según tus necesidades)
  totalElements: number = 0;

  fullName:string='';
  email:string='';

  ngOnInit(): void {

    this.selectedOrderState = this.orderStates[0];
    this.fillTable();
  }

  fillTable(){
    this.orderPage=new OrderPage(this.selectedOrderState,this.fullName,this.email,
      this.currentPage-1,this.itemsPerPage);
    this.isLoading=true;
    this.orderService.getOrderPage(this.orderPage).subscribe(
      data => {
        this.orders = data.content; 
        this.isLoading=false; 
        this.totalElements=data.totalElements; 
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
    this.currentPage=1;
    this.fillTable();
  }

  onPageChange(page: number): void {

    this.currentPage = page; // Actualiza la página actual
    console.log("this.currentpge==="+this.currentPage);
    this.fillTable();
  }

  calculateTotalPages(): number {
    return Math.ceil(this.totalElements / this.itemsPerPage);
  }

}
