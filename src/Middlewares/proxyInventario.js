import express from "express";
import { plainToClass } from "class-transformer";
import { Inventario } from "../entity/inventarioDTO.js";


const proxyInventario=express();

proxyInventario.use((req,res,next)=>{
    try {
        //convierte el objeto literal a la instancia de la clase Inventario
        let data=plainToClass(Inventario, req.body, {excludeExtraneousValues:true});  
        //almacenamos en el req.body  para utilizarlo luego
        req.body=JSON.parse(JSON.stringify(data));
        //para pasar a la siguiente funcion y no quedarse ahi
        next();
    } catch (error) {
        res.status(error.status).send(error)
    }
})

export default proxyInventario;