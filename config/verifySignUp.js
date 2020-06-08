const db = require('./db.config.js');
const config= require("./auth.config.js")
const ROLEs= config.ROLEs
const User=db.users
const Role=db.role

checkDuplicateUserNameOrEmail = (req, res, next) => {
    // -> Check Username is already in use
    User.findOne({
      where: {
        username: req.body.username
      } 
    }).then(users => {
      if(users){
        res.status(400).send("Error -> el usuario ya existe!");
        return;
      }
      
      // -> Check Email is already in use
      User.findOne({ 
        where: {
          email: req.body.email
        } 
      }).then(users => {
        if(users){
          res.status(400).send("Error -> el email ya está en uso!");
          return;
        }
          
        next();
      });
    });
  }
  checkRolesExisted = (req, res, next) => {  
    for(let i=0; i<req.body.roles.length; i++){
      if(!ROLEs.includes(req.body.roles[i].toUpperCase())){
        res.status(400).send("Error, no existe tal rol" + req.body.roles[i]);
        return;
      }
    }
    next();
  }
  

  const signUpVerify = {};
  signUpVerify.checkDuplicateUserNameOrEmail = checkDuplicateUserNameOrEmail;
  signUpVerify.checkRolesExisted = checkRolesExisted;
   
  module.exports = signUpVerify;

