import {Expose, Type, Transform} from 'class-transformer';


export class Inventario{

    //const { id_producto, id_bodega, cantidad } = req.body;
    @Expose({name:"id_product"})
    @Transform(({value})=>{ if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {"status":400, "message":"el id_product no cumple"}}, {toClassOnly:true})
    id_producto:number;
    @Expose({name:"id_bod"})
    @Transform(({value})=>{ if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {"status":400, "message":"el id_product no cumple"}}, {toClassOnly:true})
    id_bodega:number;
    @Expose({name:"cant"})
    @Transform(({value})=>{ if(Math.floor(value) && typeof value == "number") return Math.floor(value); else throw {"status":400, "message":"el id_product no cumple"}}, {toClassOnly:true})
    cantidad:number;


    constructor(id_producto:number, id_bodega:number, cantidad:number){
        this.id_producto=id_producto;
        this.id_bodega=id_bodega;
        this.cantidad=cantidad;

    }

}