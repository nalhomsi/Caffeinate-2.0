const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Shop = require('./shop');
const User = require('./user');

class Review extends Model {}

Review.init(
	{
		// id column
		reviewId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		// rating column
		rating: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				max: 5,
				min: 1,
			},
		},
		// body column
		body: {
			type: DataTypes.TEXT('long'),
		},
		// user column, ref user id
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		// shop column, ref shop id
		shopId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		// date column
		date: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
	}
);

module.exports = Review;
