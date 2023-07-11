import {Expose, Type, Transform} from 'class-transformer';


export class Bodega{
    @Expose({name:"nombre_bodega"})
    @Type(()=>String)
    nombre:string;
    @Expose({name:"id_res"})
    @Transform(({value})=>parseInt(value), {toPlainOnly:true})
    id_responsable:number;
    @Expose({name:"estado_bodega"})
    @Transform(({value})=>parseInt(value), {toPlainOnly:true}) 
    estado:number;
    @Expose({name:"created_by"})
    @Transform(({value})=>parseInt(value), {toPlainOnly:true})
    created_by:number; 
    @Expose({name:"fecha_creacion"})
    @Type(()=>String)
    created_at:string;

    constructor(nombre:string, id_res:number, estado:number, created_by:number, created_at:string){
        this.nombre=nombre;
        this.id_responsable=id_res;
        this.estado=estado;
        this.created_by=created_by;
        this.created_at=created_at;
    }

}