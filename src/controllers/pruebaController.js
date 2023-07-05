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

const metodosPrueba={
    getBodegas
};

export default metodosPrueba;