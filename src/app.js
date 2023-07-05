import express from "express";
import dotenv from 'dotenv';
import storagePrueba from "./routes/prueba.routes.js";



dotenv.config();
const app=express();

app.use(express.json());

const port=process.env.PORT;

app.listen(port, ()=>{
    console.log("server corriendoo");
})

app.use("/prueba", storagePrueba);
