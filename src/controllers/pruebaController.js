import getConnection from "../db/database.js";

const getBodegas = (req, res) => {
  try {
    const connection = getConnection();
    connection.query(
      /*sql*/ `
        SELECT * FROM bodegas ORDER BY nombre ASC`,
      (error, results) => {
        if (error) {
          res.status(500).send(error.message);
        } else {
          res.send(results);
        }
      }
    );
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const addBodegas = async (req, res) => {
  try {
    const { nombre, id_responsable, estado, created_by, created_at } = req.body;
    const bodega = { nombre, id_responsable, estado, created_by, created_at };
    const connection = getConnection();
    connection.query(
      `
            INSERT INTO bodegas SET?
        `,
      bodega,
      (error, result) => {
        if (error) {
          res.status(500).send(error.message);
        } else {
          res.send(JSON.stringify(result));
        }
      }
    );
    res.send(JSON.stringify(result));
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const getTotalProductos = async (req, res) => {
  try {
    const connection = getConnection();
    connection.query(
      /*sql*/ `SELECT productos.id, productos.nombre, CAST(IFNULL(SUM(inventarios.cantidad), 0) AS DOUBLE) AS total FROM inventarios INNER JOIN productos ON inventarios.id_producto=productos.id GROUP BY productos.id, productos.nombre ORDER BY total DESC`,
      (error, result) => {
        if (error) {
          res.status(500).send(error.message);
        } else {
          res.send(JSON.stringify(result));
        }
      }
    );
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

const addInventario = async (req, res) => {
  try {
    const { id_producto, id_bodega, cantidad } = req.body;
    const inventarios = { id_producto, id_bodega, cantidad };

    const connection = getConnection();
    let validacion;
    connection.query(
      /*sql */ `SELECT * FROM inventarios WHERE id_producto=${id_producto} AND id_bodega=${id_bodega}`,
      (error, result) => {
        if (error) {
          res.status(500).send(error.message);
        } else {
          validacion = result.length > 0;
          if (!validacion) {
         
            console.log("insertoo");
            connection.query(
              `
                INSERT INTO inventarios SET?
            `,
              inventarios,
              (error, result) => {
                if (error) {
                  res.status(500).send(error.message);
                } else {
                  res.send(result);
                }
              }
            );
          } else {
            console.log("actualizoo");
            connection.query(
              `UPDATE inventarios SET cantidad=cantidad + ${cantidad} WHERE id_producto=${id_producto} AND id_bodega=${id_bodega}; `,
              (error, result) => {
                if (error) {
                  res.status(500).send(error.message);
                } else {
                  res.send(result);
                }
              }
            );
          }
        }
      }
    );
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};



const metodosPrueba = {
  getBodegas,
  addBodegas,
  getTotalProductos,
  addInventario,
};

export default metodosPrueba;
