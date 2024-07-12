export class ProductModel {
    constructor(
        public id:number,
        public name:string,
        public code:string,
        public description:string,
        public userId:string,
        public categoryId:string
    ){}
}
