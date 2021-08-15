// import models
const Review = require('./review');
const Shop = require('./shop');
const User = require('./user');

// Users have many Reviews
User.hasMany(Review, { foreignKey: 'userId', sourceKey: 'userId' });
Review.belongsTo(User, { foreignKey: 'userId', targetKey: 'userId' });

// Shops have many Reviews
Shop.hasMany(Review, { foreignKey: 'shopId', sourceKey: 'shopId' });
Review.belongsTo(Shop, { foreignKey: 'shopId', targetKey: 'shopId' });

module.exports = {
	Review,
	Shop,
	User,
};
