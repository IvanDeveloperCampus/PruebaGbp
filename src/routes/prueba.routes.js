import {Router}  from "express";
import metodosPrueba from "../controllers/pruebaController.js";
import proxyInventario from "../Middlewares/proxyInventario.js";



const storagePrueba=Router();

storagePrueba.get("/getBodegas", metodosPrueba.getBodegas)
storagePrueba.post("/addBodegas", metodosPrueba.addBodegas)
storagePrueba.get("/getTotalProductos", metodosPrueba.getTotalProductos);
//(ruta, mileddware, funcion)
storagePrueba.post("/addInventario", proxyInventario, metodosPrueba.addInventario);
storagePrueba.post("/transladoProductos", metodosPrueba.transladoProductos);



export default storagePrueba;