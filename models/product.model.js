//create products table  
module.exports = (sequelize, Sequelize) => {
	const Products = sequelize.define('productos', {
	  product: {
		type: Sequelize.STRING
	  },
	  price: {
		type: Sequelize.INTEGER
	  },
	},{
		timestamps: false,
	});
	
	return Products;
}