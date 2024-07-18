import { OrderState } from "./order-state";

export class OrderPage {
    constructor(
        public orderState:OrderState,
        public fullName:string,
        public email:string,
        public page:number,
        public pageSize:number
    ){
        
    }
}
