//create order model
module.exports = (sequelize, Sequelize) => {
	const Orders = sequelize.define('pedidos', {
	  hour: {
		type: Sequelize.STRING
	  },
	  state: {
		type: Sequelize.STRING
      },
      number: {
		type: Sequelize.INTEGER
      },
      amount: {
		type: Sequelize.INTEGER
      },
	},{
		timestamps: false,
	});
	
	return Orders;
}