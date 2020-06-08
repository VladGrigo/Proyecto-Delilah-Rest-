const db = require('../config/db.config.js');
const Orders=db.order
const Products=db.products
const Op = db.Sequelize.Op;

//Order controllers
exports.findAll = (req, res) => {
    Orders.findAll({
      include: [{// Notice `include` takes an ARRAY
      model: Products
    }]
    }
    ).then(order => {
      // Send all orders to Client
      res.send(order);
    });
  };
  
  exports.create = (req, res) => {  
    // Save to MySQL database
    Orders.create({
        hour: req.body.hour,
        state: req.body.state,
        number: req.body.number,
        amount: req.body.amount,
        userId: req.body.userId,
    }).then(order => {
      Products.findAll({
        where: {
        product: {
          [Op.or]: req.body.products
        }
        }
      }).then(products => {
        order.setProductos(products).then(() => {
          res.send("Pedido creado con éxito!");
              });
      }).catch(err => {
        res.status(500).send("Error -> " + err);
      });
    }).catch(err => {
      res.status(500).send("Fail! Error -> " + err);
    })
  }

  exports.findByPk = (req, res) => {  
    Orders.findByPk(req.params.id_pedido, {
      include: [{// Notice `include` takes an ARRAY
      model: Products
    }]
    }).then(order => {
      res.send(order);
    })
  };
  exports.update = (req, res) => {
    const id = req.params.id_pedido;
    Orders.update(
      {  
        hour: req.body.hour,
        state: req.body.state,
        number: req.body.number,
        amount: req.body.amount,
        usuario_id: req.body.usuario_id,
        producto_id: req.body.producto_id 
     }, {where: {id:req.params.id_pedido}}
             ).then(() => {
             res.status(200).send("updated successfully an order with id = " + id);
             });
  };
  exports.delete = (req, res) => {
    const id = req.params.id_pedido;
    Orders.destroy({
      where: { id: id }
    }).then(() => {
      res.status(200).send('deleted successfully an order with id = ' + id);
    });
  };