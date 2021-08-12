const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Shop = require('./shop');
const User = require('./user');

class Review extends Model {}

Review.init(
	{
		// id column
		id: {
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
		user: {
			type: DataTypes.INTEGER,
			references: {
				model: User,
				key: 'id',
			},
		},
		// shop column, ref shop id
		shop: {
			type: DataTypes.INTEGER,
			references: {
				model: Shop,
				key: 'id',
			},
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
