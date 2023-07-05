import mysql from "promise-mysql";

const connection =  mysql.createPool({
    host: 'localhost',
    user: 'campus',
    password: 'campus2023',
    database: 'db_prueba_backend_sql',
  });

const getConnection = () => {
    return connection;
};



export default getConnection;