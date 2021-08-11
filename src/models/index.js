// import models
const Review = require("./review");
const Shop = require("./shop");
const User = require("./user");

// Reviews belongTo Users
Review.belongsTo(User);

// Shops have many Reviews
Shop.hasMany(Review);

module.exports = {
    Review,
    Shop,
    User,
};