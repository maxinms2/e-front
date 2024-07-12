import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { AlertsService } from 'src/app/services/alerts.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { HomeService } from 'src/app/services/home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  products: Product [] = [];
  isLoading: boolean=false;

  selectedModel: number=0;
  
  constructor(private homeService:HomeService,private alerts:AlertsService
    ,private errorsService:ErrorsService
  ){

  }
  
  ngOnInit(): void {
    this.isLoading=true;
    this.homeService.getProducts().subscribe(
      data =>{
        this.products = data;
        this.isLoading=false;
      },
      error=>{
        this.errorsService.redireccionaError(error.error);
        /*this.isLoading=false;
        this.alerts.warning("Error de comunicación");*/
      }
    );
  }


}
