const db = require('./config/db.config.js');
const User= db.users;
const verifySignUp = require("../Delilah Restó/config/verifySignUp.js")
const authJwt= require("../Delilah Restó/config/auth.jwt.js")
module.exports = function(app) {
    
    //users routes for admin and users roles 
    const users = require('./controllers/customer.controller.js');

     app.get('/api/users',[authJwt.verifyToken, authJwt.isAdmin],users.findAll);
     app.post('/api/users',[authJwt.verifyToken, authJwt.isAdmin], users.create);
     app.get("/api/users/:id_usuario",[authJwt.verifyToken, authJwt.isAdmin], users.findByPk);
     app.put('/api/users/:id_usuario',[authJwt.verifyToken, authJwt.isAdmin], users.update);
     app.delete('/api/users/:id_usuario',[authJwt.verifyToken, authJwt.isAdmin], users.delete);
     app.post('/api/auth/signup', [verifySignUp.checkDuplicateUserNameOrEmail ], users.signup);
     app.post('/api/auth/signin', users.signin);
     
      //active user routes
          //a user can find its own profile but cant access others users profile 
    app.get("/api/users/login/:userId",[authJwt.verifyToken, authJwt.isAdmin], users.findByPk = (req, res) => {  
      if(req.userId == req.params.userId) {
        User.findByPk(req.userId).then(users => {
          res.send(users);
        })
     } else {
        res.send("No es el id correcto")
     }
   }
      );
    //products routes for admin and users roles 
     const products = require('./controllers/product.controller.js');

     app.get('/api/products', products.findAll);
     app.post('/api/products',[authJwt.verifyToken, authJwt.isAdmin], products.create);
     app.get("/api/products/:id_producto", products.findByPk);
     app.put("/api/products/:id_producto",[authJwt.verifyToken, authJwt.isAdmin], products.update);
     app.delete("/api/products/:id_producto",[authJwt.verifyToken, authJwt.isAdmin], products.delete);

    //orders routes for admin and users roles
     const orders=require("./controllers/order.controller.js")

    app.get('/api/orders',[authJwt.verifyToken, authJwt.isAdmin], orders.findAll);
    app.post('/api/orders', orders.create);
    app.get("/api/orders/:id_pedido",[authJwt.verifyToken, authJwt.isAdmin], orders.findByPk);
    app.put("/api/orders/:id_pedido",[authJwt.verifyToken, authJwt.isAdmin], orders.update);
    app.delete("/api/orders/:id_pedido",[authJwt.verifyToken, authJwt.isAdmin], orders.delete);

    
    
}