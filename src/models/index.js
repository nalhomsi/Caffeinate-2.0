// import models
const Review = require("./review");
const Shop = require("./shop");
const User = require("./user");

// Reviews belongTo Users
Review.belongsTo(User, {foreignKey: 'id'});

// Shops have many Reviews
Shop.hasMany(Review, {foreignKey: 'id', as: 'reviews'});

module.exports = {
    Review,
    Shop,
    User,
};