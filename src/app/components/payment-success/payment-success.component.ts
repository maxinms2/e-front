import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderState } from 'src/app/common/order-state';
import { ErrorsService } from 'src/app/services/errors.service';
import { OrderService } from 'src/app/services/order.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  id:number=0;
  constructor(
    private orderService:OrderService,
    private sessionStorage:SessionStorageService,
    private errorsService:ErrorsService,
    private activatedRoute:ActivatedRoute
  ){

  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      order => {
        this.id = order['id'];

      },
      error => this.errorsService.redireccionaError(error.error)
    );
  }

}
