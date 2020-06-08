//create roles table
module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      rol: {
        type: Sequelize.STRING
      },
    },{
      timestamps: false,
    }
    );
  
    return Role;
  };