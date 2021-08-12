const seedUsers = require('./user-seeds');
const seedShops = require('./shop-seeds');
const seedReviews = require('./review-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
	await sequelize.sync();
	console.log('\n----- DATABASE SYNCED -----\n');
	await seedUsers();
	console.log('\n----- USERS SEEDED -----\n');
	await seedShops();
	console.log('\n----- SHOPS SEEDED -----\n');
	await seedReviews();
	console.log('\n----- REVIEWS SEEDED -----\n');
	process.exit(0);
};

seedAll();
