import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/common/category';
import { Jwtclient } from 'src/app/common/jwtclient';
import { Product } from 'src/app/common/product';
import { ProductCategoryName } from 'src/app/common/product-category-name';
import { AlertsService } from 'src/app/services/alerts.service';
import { CartService } from 'src/app/services/cart.service';
import { CategoryService } from 'src/app/services/category.service';
import { CounterVisitsService } from 'src/app/services/counter-visits.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { HomeService } from 'src/app/services/home.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  isLoading: boolean = false;
  buscarActivo: boolean = false;
  token: Jwtclient | null = null;

  name: string = '';
  categories: Category[] = [];
  selectedModel: number = 0;
  categoryId: number = 0;

  constructor(private homeService: HomeService, private alerts: AlertsService
    , private errorsService: ErrorsService, private cartService: CartService,
    private counterVisitsService: CounterVisitsService
  ) {

  }

  ngOnInit(): void {
    this.getCategories();
    this.getProductsCategoryName()
    this.cartService.updateCartItemCount(this.cartService.getNumberItemsCart());
    this.registraVisita();

  }

  registraVisita() {
    const tokenString = sessionStorage.getItem('token');

    if (tokenString) {
      try {
        this.token = JSON.parse(tokenString);
      } catch (error) {
        console.error('Error al parsear el token:', error);
      }
    }
    console.log('tokennnnnn=' + this.token);
  }

  getProductsCategoryName() {
    this.isLoading = true;
    let productCategoryName = new ProductCategoryName(this.categoryId, this.name);
    this.homeService.getProductsCategoryName(productCategoryName).subscribe(
      data => {
        this.products = data;
        this.isLoading = false;
        this.buscarActivo = false;
        if (this.token === null || this.token.type !== 'ADMIN') {
          this.counterVisitsService.setCounter().subscribe(
            c => console.log("counter======" + c)
          )
        }
      },
      error => {
        this.errorsService.redireccionaError(error.error);
        this.buscarActivo = false;
      }
    );
  }

  getCategories() {
    return this.homeService.getCategoryList().subscribe(
      data => {
        this.categories = data;
        let catAll: Category = new Category(0, 'Todas', this.categories[0].modelos);
        this.categories.unshift(catAll);
      }
      ,
      error => this.errorsService.redireccionaError(error.error)
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
    this.buscarActivo = true;
  }

  clearInput(): void {
    this.name = '';
  }

}
