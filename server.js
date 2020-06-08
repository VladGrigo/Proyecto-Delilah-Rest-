const express= require("express");
const app= express();
bodyParser= require ("body-parser")

const db = require('../Delilah Restó/config/db.config.js');
const Role = db.role;
const Products= db.products;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('../Delilah Restó/routes.js')(app);

// Create a Server
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("App listening at http://%s:%s", host, port)
})

//In case we need to reset the tables 

/*db.role.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
  initialRole()
  initialProduct()
}); 

function initialRole(){
  Role.create({
    id: 1,
    rol: "USER"
  });
  
  Role.create({
    id: 2,
    rol: "ADMIN"
  });
}

function initialProduct(){
  Products.create({
    id: 1,
    product: "pizza",
    price: 450
  });
  
  Products.create({
    id: 2,
    product: "empanadas",
    price: 400
  });
}*/