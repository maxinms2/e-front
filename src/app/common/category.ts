import { CategoryModel } from "./category-model";

export class Category {
    constructor( public id:number, public name:string,public modelos: CategoryModel[]){}
}
