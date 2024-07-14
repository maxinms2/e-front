import { OrderState } from "./order-state";

export class OrderDTO {
    constructor(
        public id:number|null,
        public dateCreated:Date,
        public orderState:OrderState
        
    ){}
}
