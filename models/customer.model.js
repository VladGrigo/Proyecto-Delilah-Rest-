//create user table
module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('usuarios', {
	  username: {
		type: Sequelize.STRING
	  },
	  fullname: {
		type: Sequelize.STRING
	  },
	  email: {
		  type: Sequelize.STRING
	  },
	  address: {
		type: Sequelize.STRING
	},
	password: {
		type: Sequelize.STRING
	}
	},{
		timestamps: false,
	});
	
	return User;
}

