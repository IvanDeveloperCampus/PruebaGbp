import {Router}  from "express";
import metodosPrueba from "../controllers/pruebaController.js";



const storagePrueba=Router();

storagePrueba.get("/getBodegas", metodosPrueba.getBodegas)
storagePrueba.post("/addBodegas", metodosPrueba.addBodegas)
storagePrueba.get("/getTotalProductos", metodosPrueba.getTotalProductos);
storagePrueba.post("/addInventario", metodosPrueba.addInventario);


export default storagePrueba;