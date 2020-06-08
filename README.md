# Proyecto Delilah Restó

Api de pedidos, usuarios y ordenes para restaurants o servicios de comidas rápidas

## Empezando

Estas instrucciones te servirán para iniciar el servidor y poder evaluar el funcionamiento de cada ruta.

### Prerequisitos

Para que el servidor pueda correr adecuadamente, se utilizaron los siguientes módulos

```
*Jsonwebtoken
*express
*nodemon
*bycrypt
*sequelize
```
Estos complementos ya se encuentran dentro del Zip de la api, por lo que no será necesario instalarlos de vuelta. 
Extraer del Zip TODA la carpeta junta "Delilah Restó", en donde se van a encontrar todos los acrhivos necesarios para el funcionamiento de la api

### Iniciando el servidor 

Para iniciar el servidor, en la terminal será necesario escribir lo siguiente

```
node server.js
```

En la misma terminal, debería aparecer la siguiente afirmación

```
App listening at http://:::8081
```
De aquí en más se podrán probar las distintas rutas que la api ofrece

## Corriendo las rutas de Usuarios

De acá en más se darán ejemplos de como implementar las rutas correspondientes mediante ejemplos

### Registrar Usuario 
La ruta de registro de usuarios es la siguiente
```
localhost:8081/api/auth/signup
```
En la base de datos, ya se encuentran disponibles dos usuarios (un USER y un ADMIN). Para poder registrar uno nuevo, puede utilizar los siguientes ejemplos, dependiendo del rol del respectivo nuevo usuario.

#### Rol USER

```
{
	"username":"juan88",
	"fullname": "Juan Perez",
	"email": "juan@gmail.com",
	"address": "General Paz 9988",
	"password": "juan123",
	"roleId": 1
	
} 
```
#### Rol ADMIN

```
{
	"username":"mariagon",
	"fullname": "Maria Gonzalez",
	"email": "maria@gmail.com",
	"address": "Recta Martinolli 4450",
	"password": "maria123",
	"roleId": 2
	
} 
```
### Login de Usuario
la ruta del Login del usuario es la siguiente

```
localhost:8081/api/auth/signin
```

Para que el usuario inicie sesión, lo único que se necesita es el username y la contraseña. Por ejemplo, el perfil ADMIN antes mencionado hace un login
```
{
	"username":"mariagon",
	"password": "maria123",
	
} 
```
Ya que la contraseña es igual a la registrada durante el Sign-Up, aparecerá lo siguiente
```
{
    "auth": true,
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZWlkIjoyLCJpYXQiOjE1OTE2Mzk0NDksImV4cCI6MTU5MTcyNTg0OX0.3sCfnB00aKWgWwesy9Vud2n7OdOL3EdAnMM9yxJtOn0"

} 
```
El token servirá para acceder a cada una de las rutas concedidas según el rol del usuario logueado. Previamente a acceder cualquier ruta, dentro de la pestaña "Headers", insertar el token anterior en base al siguiente orden
```
    Key: x-access-token
    Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZWlkIjoyLCJpYXQiOjE1OTE2Mzk0NDksImV4cCI6MTU5MTcyNTg0OX0.3sCfnB00aKWgWwesy9Vud2n7OdOL3EdAnMM9yxJtOn0

```
Las siguientes rutas, para acceder, necesitará del token correspondiente en el header para que puedan funcionar

### Buscar usuario por ID
para buscar un usuario por Id, utilizaremos la siguiente ruta con GET
```
   localhost:8081/api/users/:id_usuario

```
si queremos, por ejemplo, buscar el usuario con Id igual a 2, utilizamos la siguiente consulta
```
   localhost:8081/api/users/2

```
### Cambiar información de usuario 
Para cambiar la información registrada, utilizaremos la siguiente ruta con PUT
```
   localhost:8081/api/users/:id_usuario

```
Si queremos, por ejemplo, cambiar el mail del usuario con id igual a 2
```
{
	
	"email": "holamundo@gmail.com"
	
	
} 
```
utilizamos la siguiente consulta,  
```
   localhost:8081/api/users/2

```
### Borrar usuario 
Para eliminar la información registrada de un usuario, utilizaremos la siguiente ruta con DELETE
```
   localhost:8081/api/users/:id_usuario

```
Si queremos, por ejemplo, eliminar el perfil del usuario con id igual a 2, utilizamos
```
   localhost:8081/api/users/2

```
## Corriendo las rutas de Productos
En la siguiente sección se darán ejemplos de como implementar las rutas correspondientes de productos 

### Crear Producto

Para insertar un producto dentro del menú, necesitaremos la siguiente informacion en el body, 

```
{
	"product":"Lomito",
	"price": 450,
	
}
```
Insertado el producto en el body, la ruta para crear el producto utilizando POST, es la siguiente

```
localhost:8081/api/products
```
### Buscar Productos 
Para visualizar todos los productos del menú junto con su precio, utilizaremos la siguiente ruta con GET
```
localhost:8081/api/products
```
### Buscar Producto por ID
Para buscar un producto del menú por Id, utilizaremos la siguiente ruta con GET
```
localhost:8081/api/products/:id_producto
```
Si queremos, por ejemplo, buscar el producto con Id igual a 2 del menú, utilizamos
```
localhost:8081/api/products/2
```
### Actualizar Producto por ID
Para cambiar la información registrada, utilizaremos la siguiente ruta con PUT
```
   localhost:8081/api/products/:id_producto

```
Si queremos, por ejemplo, cambiar el precio del producto con id igual a 2
```
{
	
	"price": 500
	
	
} 
```
utilizamos la siguiente consulta,  
```
   localhost:8081/api/products/2

```
### Eliminar Producto por ID
Para eliminar la información registrada de un producto, utilizaremos la siguiente ruta con DELETE
```
   localhost:8081/api/products/:id_producto

```
Si queremos, por ejemplo, eliminar el producto del id igual a 2, utilizamos
```
    localhost:8081/api/products/2

```
## Corriendo las rutas de Pedidos
En la siguiente sección se darán ejemplos de como implementar las rutas correspondientes de pedidos

### Crear Pedido 
Un usuario logueado puede crear un pedido de uno o más productos. Esto se hace con POST mediante la ruta
```
    localhost:8081/api/orders

```

#### Un producto
Si se quiere crear un pedido que contenga un solo producto del menú, insertaremos en el body la siguiente información
```
{
	"hour":"22:40hs",
	"state": "en preparación",
	"number": 3,
	"amount": 1040,
	"products":["pizza"],
	"userId": 1
	
}

```
#### Dos o más productos 
En el caso de que sean más productos, el body contendrá lo siguiente
```
{
	"hour":"22:40hs",
	"state": "en preparación",
	"number": 3,
	"amount": 1040,
	"products":["pizza", "empanadas"],
	"userId": 1	
	
}

```
En este caso, se insertará el pedido en la tabla "pedidos" con la información anterior y tambien se actualizará la tabla "pedidos_productos" con los IDs del pedido y de los productos correspondientes.

### Buscar Pedidos 
Para buscar todos los pedidos realizados al restó, se utilizará la siguiente ruta con GET
```
    localhost:8081/api/orders

```
### Buscar Pedidos por ID
Para buscar un pedido por ID, se utilizará la siguiente ruta con GET
```
    localhost:8081/api/orders/:id_pedido

```
Por ejemplo, si queremos buscar un pedido con Id igual a 2, 
```
    localhost:8081/api/orders/2

```
### Actualizar Pedido por ID
Para actualizar un pedido por ID, se utilizará la siguiente ruta con PUT
```
    localhost:8081/api/orders/:id_pedido

```

Si queremos, por ejemplo, cambiar el estado del pedido con id igual a 2
```
{
	
	"state": "Enviado"
	
	
} 
```
utilizamos la siguiente consulta,  
```
    localhost:8081/api/orders/2

```
### Eliminar Pedido por ID
Para eliminar la información registrada de un pedido, utilizaremos la siguiente ruta con DELETE
```
   localhost:8081/api/orders/:id_pedido

```
Si queremos, por ejemplo, eliminar el producto del id igual a 2, utilizamos
```
    localhost:8081/api/orders/2

```
## Deployment

Add additional notes about how to deploy this on a live system

## Construido con

* [NodeJs](https://nodejs.org/es/) - JavaScript runtime built on Chrome's V8 JavaScript engine.
* [RemotemySQL](https://remotemysql.com/) - Free remote MySQL database
* [Postman](https://www.postman.com/) - Collaboration platform for API development
* [Javascript](https://www.javascript.com/) - Dynamic computer programming language


## Autor

* **Vladimir Gregorieu** - *Construcción de Delilah Restó* - 

## Destino

Tercer Proyecto para el curso de Desarrollo Web Full Stack de [Acámica](acamica.com/) 

