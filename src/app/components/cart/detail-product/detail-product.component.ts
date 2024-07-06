import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ItemCart } from 'src/app/common/item-cart';
import { Jwtclient } from 'src/app/common/jwtclient';
import { CartService } from 'src/app/services/cart.service';
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
  }

  constructor(private homeService:HomeService, private activatedRoute: ActivatedRoute, 
    private cartService:CartService, private toastr:ToastrService,
    private sessionStorage:SessionStorageService,private router: Router){

  }

  getProductById(){
    this.activatedRoute.params.subscribe(
      p => {
        let id = p['id'];
        if(id){
          this.homeService.getProductById(id).subscribe(
            data =>{
              this.id = data.id;
              this.name = data.name;
              this.description = data.description;
              this.urlImage = data.urlImage;
              this.price = data.price;
            }
          );
        }
      }

    );
  }

  addCart(id : number){
    console.log('id product: ', id);
    console.log('name product: ', this.name);
    console.log('price product: ', this.price);
    console.log('quantity product: ', this.quantity);
    
    const itemIndex = this.items.findIndex(i => i.productId === id);
    if (itemIndex !== -1) {
      this.items[itemIndex].quantity+= this.quantity;
      this.toastr.success('Cantidad del producto modificada el carrito de compras'
         + this.quantity + '--'+this.items[itemIndex].quantity, 'Carrito compras');
    }else{
      let item = new ItemCart(id, this.name, this.quantity, this.price);  
      this.items.push(item);
      console.log("itemsss="+this.items.length);
      this.toastr.success('Producto añadido al carrito de compras', 'Carrito compras');
    }  
    sessionStorage.setItem('items', JSON.stringify(this.items)); 
    this.router.navigate(['/']);
  }

}
