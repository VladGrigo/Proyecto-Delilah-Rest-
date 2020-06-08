const jwt = require('jsonwebtoken');
const db = require('./db.config.js');
const config= require("./auth.config.js")
const User=db.users
const Role=db.role

//verify the generated token of the user 
verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({
        message: "No has dado un Token!"
      });
    }
  
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Sin autorización!"
        });
      }
      req.userId = decoded.id;
      req.roleId=decoded.roleid
      next();
    });
  };
  
//check if the login belongs to a user or an admin role
  isAdmin = (req, res, next) => {
    if(req.roleId !== 2) {
      res.send("Accesso Denegado. Requiere permiso de administrador");
   } else {
      next();
   }
 }
 
exports.findByPk = (req, res) => {  
  User.findByPk(req.params.id_usuario).then(users => {
    res.send(users);
  })
};
  
  
  const authJwt = {};
    authJwt.verifyToken = verifyToken;
    authJwt.isAdmin = isAdmin;
  module.exports = authJwt;
  