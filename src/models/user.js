const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class User extends Model {}

User.init(
	{
		// id column
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		// username column
		username: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		// email column
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: { isEmail: true },
		},
		// hashedPassword column
		hashedPassword: {
			type: DataTypes.STRING(64),
			allowNull: false,
		},
		// refreshToken
		refreshToken: {
			type: DataTypes.STRING,
		},
	},
	{
		sequelize,
		timestamps: false,
		freezeTableName: true,
		underscored: true,
	}
);

module.exports = User;
