export class OrderProduct {
    constructor(
        public id:number|null,
        public productId:number,
        public quantity:number,
        public price:number,
        public model:string,
        public name:string,
        public description:string
        ){}
}
