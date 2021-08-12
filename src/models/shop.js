const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Shop extends Model {}

Shop.init(
	{
		// id column
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		// name column
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		// address column
		address: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		// website column
		website: {
			type: DataTypes.STRING,
			validate: { isUrl: true },
		},
		// latitude column
		latitude: {
			type: DataTypes.DECIMAL,
			validate: {
				min: -90,
				max: 90,
			},
		},
		// longitude column
		longitude: {
			type: DataTypes.DECIMAL,
			validate: {
				min: -180,
				max: 180,
			},
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
	}
);

module.exports = Shop;
