import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { AlertsService } from 'src/app/services/alerts.service';
import { ErrorsService } from 'src/app/services/errors.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products : Product[] = [];

  constructor(private productService:ProductService,
      private alerts:AlertsService,private errorsService:ErrorsService ){}

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts(){
    console.log('listProducts');
    this.productService.getProducts().subscribe(
      data => {
        this.products = data
        console.log(data);      
      },
        error=>{
          this.errorsService.redireccionaError(error.error);
        }
    );
  }

  deleteProductById(id:number){

    Swal.fire({
      title: 'Está seguro que quiere eliminar el registro?',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.deleteProductById(id).subscribe(
          ()=> this.listProducts(),
          error=>this.errorsService.redireccionaError(error.error)
        );
        Swal.fire(
          'Productos',
          'Producto eliminado correctamente.',
          'success'
        )
      }
    })
    
   

  }

}
