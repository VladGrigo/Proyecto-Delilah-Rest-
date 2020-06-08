const Sequelize= require ("sequelize")

const sequelize = new Sequelize('vKldW7ZBN9', 'vKldW7ZBN9', '7l6zhLDlMV', {
    host: 'remotemysql.com',
    dialect: 'mysql' 
  });
 
  const db = {};
 
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;

  db.users = require('../models/customer.model')(sequelize, Sequelize);
  db.products= require("../models/product.model.js")(sequelize, Sequelize);
  db.order= require("../models/order.model.js")(sequelize, Sequelize);
  db.role=require("../models/role.model.js")(sequelize, Sequelize);

//one to many relationship between users and roles
  db.role.hasMany(db.users, {foreignKey: 'roleId', sourceKey: 'id'});
  db.users.belongsTo(db.role, {foreignKey: 'roleId', targetKey: 'id'});

//one to many relationship between orders and users
  db.users.hasMany(db.order, {foreignKey: 'userId', sourceKey: 'id'});
  db.order.belongsTo(db.users, {foreignKey: "userId",targetKey: 'id'});
  
//many to many relationship between orders and products
  db.products.belongsToMany(db.order, { through: 'pedidos_productos', foreignKey: 'productId', otherKey: 'orderId'});
  db.order.belongsToMany(db.products, { through: 'pedidos_productos', foreignKey: 'orderId', otherKey: 'productId'});

  module.exports= db;
 

