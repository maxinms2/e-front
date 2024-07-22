export class ItemCart {
    constructor(public productId:number, public productName:string, 
        public quantity:number, public price:number,
        public model:string,public description:string){

    }

    getTotalPriceItem(){
        return this.quantity * this.price;
    }

}
