import {Router}  from "express";
import metodosPrueba from "../controllers/pruebaController.js";


const storagePrueba=Router();

storagePrueba.get("/getBodegas", metodosPrueba.getBodegas);


export default storagePrueba;