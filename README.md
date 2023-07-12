## Prueba Backend sql



## 1.  Archivo .env en la raiz del proyecto

Crear el archivo .env en la raiz del proyecto tome como guia el .envexample

## 2. Dependencias utilizadas en el proyecto

- Nodemon 
- dotenv		
- express
- mysql2
- class-transformer
- reflect-metadata
- typescript

## 3. Instalación

​	npm i

## 4. Para ejecutar el proyecto

​	npm run dev

## 5. Test

1. Realizar un EndPolnt que permita listar todas las bodegas ordenadasalfabéticamente. 

   ##### Metodo GET=> http://127.0.0.1:5001/prueba/getBodegas.

2. Realizar un EndPolnt que permita crear una bodegas.(agregar en los
   comentarios de la función los datos de entrada).

   ##### Metodo POST=>http://127.0.0.1:5001/prueba/addBodegas

   ###### Datos de entrada => {

     "nombre":18,
     "id_responsable":12,
     "estado":1,
      "created_by":12,
      "created_at":"2023-07-07 09:36:44"
   }

3. Realizar un EndPoint que permita listar todos los productos en orden
   descendente por el campo "Total".

   ##### Metodo GET => http://127.0.0.1:5001/prueba/getTotalProductos.

   

   4. Realizar un EndPoint que permita insertar registros en la tabla de inventarios, los parámetros de entrada deben ser
      (id_producto,id_bodega,cantidad).

   ###### Metodo POST => http://127.0.0.1:5001/prueba/addInventario

   ##### Datos de entrada=> {

     "id_producto":18,
     "id_bodega":12,
     "cantidad":1
   }

   5. Realizar un EndPolnt que permita Trasladar un producto de una bodega a otra

##### 		Metodo POST => http://127.0.0.1:5001/prueba/transladoProductos

###### Datos de entrada => {

  "id_producto":18,
  "id_bodega_origen":12,
  "id_bodega_origen":19,
  "cantidad":5
}