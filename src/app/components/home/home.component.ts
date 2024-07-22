import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/common/category';
import { Product } from 'src/app/common/product';
import { ProductCategoryName } from 'src/app/common/product-category-name';
import { AlertsService } from 'src/app/services/alerts.service';
import { CategoryService } from 'src/app/services/category.service';
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
  buscarActivo:boolean=false;

  name:string='';
  categories : Category [] = [];
  selectedModel: number=0;
  categoryId : number = 0;
  
  constructor(private homeService:HomeService,private alerts:AlertsService
    ,private errorsService:ErrorsService
  ){

  }
  
  ngOnInit(): void {
    this.getCategories();
    this.getProductsCategoryName()

  }

  getProductsCategoryName(){
    this.isLoading=true;
    let productCategoryName=new ProductCategoryName(this.categoryId,this.name);
    this.homeService.getProductsCategoryName(productCategoryName).subscribe(
      data =>{
        this.products = data;
        this.isLoading=false;
        this.buscarActivo=false;
      },
      error=>{
        this.errorsService.redireccionaError(error.error);
        this.buscarActivo=false;
      }
    );
  }

  getCategories(){
    return this.homeService.getCategoryList().subscribe(
      data => {
        this.categories = data;
        let catAll:Category=new Category(0,'Todas',this.categories[0].modelos);
        this.categories.unshift(catAll);
      }
        ,
      error=>this.errorsService.redireccionaError(error.error)
    );
  }

  onOrderStateChange(event: any): void {
    this.categoryId = event.target.value;
    console.log('Selected Order State:', this.categoryId);
    this.getProductsCategoryName();
  }

  onInputChange(event: any): void {
    const inputValue = event.target.value;
    console.log('Valor del input:', inputValue);
    this.buscarActivo=true;
  }

  clearInput(): void {
    this.name = '';
  }

}
