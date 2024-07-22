import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from 'src/app/common/category';
import { CategoryModel } from 'src/app/common/category-model';
import { ItemCart } from 'src/app/common/item-cart';
import { Jwtclient } from 'src/app/common/jwtclient';
import { Product } from 'src/app/common/product';
import { AlertsService } from 'src/app/services/alerts.service';
import { CartService } from 'src/app/services/cart.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { HomeService } from 'src/app/services/home.service';
import { ProductService } from 'src/app/services/product.service';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit {
  id : number = 0;
  name :string ='';
  description :string = '';
  price : number =0;
  urlImage : string = '';
  quantity : number = 0;
  token: Jwtclient | null = null;
  items : ItemCart [] = [];
  selectedModel: string='';
  categoryModels:CategoryModel[]=[];

  ngOnInit(): void {
    const tokenString = sessionStorage.getItem('token');
    if (tokenString) {
      try {
        this.token = JSON.parse(tokenString);
      } catch (error) {
        console.error('Error al parsear el token:', error);
      }
    }

    const tokensString = sessionStorage.getItem('items');
    if (tokensString) {
      this.items = JSON.parse(tokensString);
    } else {
      this.items = [];
    } 
  
    this.getProductById();
    this.cartService.updateCartItemCount(this.cartService.getNumberItemsCart());
  }

  constructor(private homeService:HomeService, private activatedRoute: ActivatedRoute, 
    private cartService:CartService, private toastr:ToastrService,private errorsService:ErrorsService,
    private sessionStorage:SessionStorageService,private router: Router,private alerts:AlertsService){
    
  }

  onSelectedModelChange(event: any): void {
    this.selectedModel = event.target.value;
    console.log('Selected Order State y:', this.selectedModel);
  }

  getProductById(){
    this.activatedRoute.params.subscribe(
      p => {
        let id = p['id'];
        if(id){
          this.homeService.getProductById(id).subscribe(
            data =>{
              this.categoryModels=data.category.modelos;
              this.id = data.id;
              this.name = data.name;
              this.description = data.description;
              this.urlImage = data.urlImage;
              this.price = data.price;
            }
          );
        }
        
      },
      error=>this.errorsService.redireccionaError(error.error)

    );
  }

  addCart(id : number){

    if(this.quantity===0){
      this.alerts.warning('La cantidad del producto debe ser nayor que 0');
      return;
    }
    if(this.selectedModel===''){
      this.alerts.warning('Seleccione una talla');
      return;     
    }
    console.log('id product: ', id);
    console.log('name product: ', this.name);
    console.log('price product: ', this.price);
    console.log('quantity product: ', this.quantity);
    
    const itemIndex = this.items.findIndex(i => i.productId === id && i.model===this.selectedModel
    );
    console.log("idddd====="+itemIndex);
    if (itemIndex !== -1) {
      console.log('ojo1');
      this.items[itemIndex].quantity+= this.quantity;
      this.alerts.success('Cantidad del producto modificada del carrito de compras');
    }else{
      console.log('ojo2');
      let item = new ItemCart(id, this.name, this.quantity, this.price,
        this.selectedModel,this.description);  
      this.items.push(item);
      console.log("itemsss="+this.items.length);
      this.alerts.success('Producto añadido al carrito de compras');
    }  
    sessionStorage.setItem('items', JSON.stringify(this.items)); 
    this.cartService.updateCartItemCount(this.cartService.getNumberItemsCart());
    this.router.navigate(['/']);
  }

}
