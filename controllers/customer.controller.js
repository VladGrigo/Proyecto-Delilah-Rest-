const db = require('../config/db.config.js');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
const config = require('../config/auth.config.js');
const User= db.users;
const Role=db.role;
const Op = db.Sequelize.Op;

//find all users 
exports.findAll = (req, res) => {
    User.findAll(
      {
        include: [{
        model: Role
      }]
      }
    ).then(users => {
      // Send all customers to Client
      res.send(users);
    });
  };
//create a user without signup (only authorized for admins)
exports.create = (req, res) => {  
    // Save to MySQL database
    User.create({
      id_usuario: req.body.id_usuario,  
      username: req.body.username,
      fullname: req.body.fullname,
      email: req.body.email,
      address: req.body.address,
      password: req.body.password,
    }).then(users => {    
      // Send created customer to client
      res.send(users);
    });
  };
//find users by primary key
  exports.findByPk = (req, res) => {  
    User.findByPk(req.params.id_usuario, {
      include: [{
      model: Role
    }]
    }).then(users => {
      res.send(users);
    })
  };
//update a user personal information
  exports.update = (req, res) => {
    const id = req.params.id_usuario;
    User.update(
      {  
      username: req.body.username,
      fullname: req.body.fullname,
      email: req.body.email,
      address: req.body.address,
      password: req.body.password,
     }, {where: {id:req.params.id_usuario}}
             ).then(() => {
             res.status(200).send("Actualizado con éxito un usuario con id = " + id);
             });
  };
  exports.delete = (req, res) => {
    const id = req.params.id_usuario;
    User.destroy({
      where: { id_usuario: id }
    }).then(() => {
      res.status(200).send('Eliminado con éxito un usuario con id = ' + id);
    });
  };
//normal signup of a user
  exports.signup = (req, res) => {
    // Save User to Database
    console.log("Processing func -> SignUp");
    
    User.create({ 
      username: req.body.username,
      fullname: req.body.fullname,
      email: req.body.email,
      address: req.body.address,
      password: bcrypt.hashSync(req.body.password, 8),
      roleId:req.body.roleId
    }).then(users => {    
      // Send created customer to client
      res.send(users);
    }).catch(err => {
      res.status(500).send('Error -> ' + err);
    })
  };
//normal sign-in for a user 
  exports.signin = (req, res) => {
    console.log("Sign-In");
    
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(users => {
      if (!users) {
        return res.status(404).send('Usuario no encontrado!');
      }
   
      var passwordIsValid = bcrypt.compareSync(req.body.password, users.password);
      if (!passwordIsValid) {
        return res.status(401).send({ auth: false, accessToken: null, reason: "Contraseña Incorrecta!" });
      }
      
      var token = jwt.sign({ id: users.id, roleid: users.roleId}, config.secret, {
        expiresIn: 86400 // expires in 24 hours
      });
      
      res.status(200).send({ auth: true, accessToken: token });
      
    }).catch(err => {
      res.status(500).send('Error -> ' + err);
    });
  }
   
 
   

 



