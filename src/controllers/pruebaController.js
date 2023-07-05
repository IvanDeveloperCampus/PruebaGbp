import getConnection from "../db/database.js";

const getBodegas=async(req, res)=>{
    try{
        const connection= await getConnection();
        const result=await connection.query(/*sql*/`
        SELECT * FROM bodegas ORDER BY nombre ASC`);
        res.send(JSON.stringify(result)) 
       }catch(error){
        res.status(500);
        res.send(error.message);
       }
}

const addBodegas=async(req, res)=>{
    try{
        console.log("entraa");
        const {nombre, id_responsable, estado, created_by, created_at}=req.body
        const bodega={nombre, id_responsable, estado, created_by, created_at};
        const connection= await getConnection();
        const result=await connection.query(`
            INSERT INTO bodegas SET?
        `, bodega);
        res.send(JSON.stringify(result)) 
    }catch(error){
        res.status(500);
        res.send(error.message);
       }
}

const metodosPrueba={
    getBodegas,
    addBodegas
};

export default metodosPrueba;