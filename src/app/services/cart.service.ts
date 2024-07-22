import { Injectable } from '@angular/core';
import { ItemCart } from '../common/item-cart';
import { SessionStorageService } from './session-storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: Map<number,ItemCart> = new Map<number, ItemCart>();

  itemList : ItemCart [] = [];



  constructor() {

   }

   private cartItemCount = new BehaviorSubject<number>(0);

   cartItemCount$ = this.cartItemCount.asObservable();
 
   updateCartItemCount(count: number) {
     this.cartItemCount.next(count);
   }

  addItemCart(itemCart : ItemCart){
    this.items.set(itemCart.productId, itemCart);
  }

  deleteItemCart(productId:number){
    this.items.delete(productId);
    this.items.forEach(
      (valor, clave)=>{
        console.log('esta es la clave y su valor: '+clave, valor);
      }

    );
  }
  
  totalCart(){
    let totalCart:number=0;
    this.items.forEach(
      (item, clave)=>{
        totalCart+= item.getTotalPriceItem();
      }

    );
    return totalCart;
  }

  convertToListFromMap(){
    this.itemList.splice(0,this.itemList.length);
    this.items.forEach(
      (item, clave)=>{
        this.itemList.push(item);
      }

    );
    return this.itemList;
  }

  getNumberItemsCart(){
    let itemsStorage = [];
    let totalCount:number=0;
    const itemsString = sessionStorage.getItem('items');
    if (itemsString) {
      console.log("itemsString====" + itemsString);
      itemsStorage = JSON.parse(itemsString);
      itemsStorage.forEach(
        (item: { quantity: number; }) => {
          totalCount+=item.quantity;
        }
      );
    }
    console.log("totalCountcart===="+totalCount);
    return totalCount;
  }

}
