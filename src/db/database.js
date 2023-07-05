import mysql from 'mysql2';

let myConfig=JSON.parse(process.env.MY_CONNECT)

const connection=mysql.createPool(myConfig)

const getConnection = () => {
    return connection;
};


export default getConnection;