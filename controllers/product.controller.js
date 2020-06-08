const db = require('../config/db.config.js');
const Products=db.products

//Products controllers
exports.findAll = (req, res) => {
    Products.findAll().then(products => {
      // Send all customers to Client
      res.send(products);
    });
  };
  
  exports.create = (req, res) => {  
    // Save to MySQL database
    Products.create({  
      product: req.body.product,
      price: req.body.price,
    }).then(products => {    
      // Send created customer to client
      res.send(products);
    });
  };

  exports.findByPk = (req, res) => {  
    Products.findByPk(req.params.id_producto).then(products => {
      res.send(products);
    })
  };
  exports.update = (req, res) => {
    const id = req.params.id_producto;
    Products.update(
      {    
        product: req.body.product,
        price: req.body.price,
     }, {where: {id:req.params.id_producto}}
             ).then(() => {
             res.status(200).send("updated successfully a product with id = " + id);
             });
  };

  exports.delete = (req, res) => {
    const id = req.params.id_producto;
    Products.destroy({
      where: { id: id }
    }).then(() => {
      res.status(200).send('deleted successfully a product with id = ' + id);
    });
  };