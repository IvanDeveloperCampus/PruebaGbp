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
              /*sql */`
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

const transladoProductos = (req, res) => {
  try {
    const { id_producto, id_bodega_origen, id_bodega_destino, cantidad } = req.body;
    const historial = { id_bodega_origen, id_bodega_destino, cantidad };
    const connection = getConnection();

    connection.query('START TRANSACTION', function (err) {
      if (err) {
        res.status(500).send(err.message);
        return;
      }

      const query1 = `SELECT cantidad FROM inventarios WHERE id_producto=${id_producto} and id_bodega=${id_bodega_origen}`;
      const query2 = `UPDATE inventarios SET cantidad=cantidad - ${cantidad} WHERE id_producto=${id_producto} and id_bodega=${id_bodega_origen}`;
      const query3 = `UPDATE inventarios SET cantidad=cantidad + ${cantidad} WHERE id_producto=${id_producto} and id_bodega=${id_bodega_destino}`;
      const query4 = 'INSERT INTO historiales SET ?';

      connection.query(query1, function (err, result) {
        if (err) {
          rollbackAndSendError(err.message);
          return;
        }
       
        if (result[0].cantidad >= cantidad) {
          connection.query(query2, function (err, result) {
            if (err) {
              rollbackAndSendError(err.message);
              return;
            }
           

            connection.query(query3, function (err, result) {
              if (err) {
                rollbackAndSendError(err.message);
                return;
              }
              
              connection.query(query4, historial, function (err, result) {
                if (err) {
                  rollbackAndSendError(err.message);
                  return;
                }
                

                commitAndSendResponse('Transacción exitosa');
              });
            });
          });
        } else {
          rollbackAndSendResponse('No se puede, la cantidad de productos es menor');
        }
      });
    });

    //FUNCION PARA MOSTRAR ERRORES
    function rollbackAndSendError(errorMessage) {
      connection.query('ROLLBACK', function () {
        res.status(500).send(errorMessage);
      });
    }

    //FUNCION PARA ENVIAR UN ERROR COMO RESPUESTA
    function rollbackAndSendResponse(responseMessage) {
      connection.query('ROLLBACK', function () {
        res.status(200).send(responseMessage);
      });
    }

    //FUNCION PARA ENVIAR QUE SE FUE EXITOSO
    function commitAndSendResponse(responseMessage) {
      connection.query('COMMIT', function (err) {
        if (err) {
          rollbackAndSendError(err.message);
        } else {
          res.status(200).send(responseMessage);
        }
      });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};



const metodosPrueba = {
  getBodegas,
  addBodegas,
  getTotalProductos,
  addInventario,
  transladoProductos
};

export default metodosPrueba;
