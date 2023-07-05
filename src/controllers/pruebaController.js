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

const addInventario=async(req, res)=>{
    try{
        
        const {id_producto,id_bodega,cantidad}=req.body
        const inventarios={id_producto,id_bodega,cantidad}

        const connection= await getConnection();
        const validacion=await connection.query(`SELECT * FROM inventarios WHERE id_producto=${id_producto} AND id_bodega=${id_bodega};`);
        
        let result;
        if(validacion.length<=0){
             result=await connection.query(`
            INSERT INTO inventarios SET?
        `, inventarios);
        }else{
            result=await connection.query(`UPDATE inventarios SET cantidad=cantidad + ${cantidad} WHERE id_producto=${id_producto} AND id_bodega=${id_bodega}; `)
        }
        res.send(JSON.stringify(result)) 
    }catch(error){
        res.status(500);
        res.send(error.message);
       }
}

const metodosPrueba={
    getBodegas,
    addBodegas,
    addInventario
};

export default metodosPrueba;