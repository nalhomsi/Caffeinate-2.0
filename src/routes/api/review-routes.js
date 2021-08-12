const express = require('express');
const { Review, Shop, User } = require('../../models/index');
const router = express.Router();
const { QueryTypes, Sequelize } = require('sequelize');
const sequelize = require('../../config/connection');

// Get all Reviews
router.get('/', (req, res) => {
	Review.findAll({
		attributes: { exclude: ['reviewId', 'userId', 'shopId'] },
		include: [
			{
				model: User,
				as: 'User',
				attributes: ['username'],
			},
			{
				model: Shop,
				as: 'Shop',
				attributes: ['name', 'address', 'website'],
			},
		],
	})
		.then((dbReviewData) => res.json(dbReviewData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

router.get('/:username', (req, res) => {
	User.findAll({
		attributes: {
			exclude: ['userId', 'email', 'hashedPassword', 'refreshToken'],
		},
		include: [
			{
				model: Review,
				attributes: ['rating', 'body', 'date'],
				include: [
					{
						model: Shop,
						as: 'Shop',
						attributes: ['name', 'address', 'website'],
					},
				],
			},
		],
		where: { username: req.params.username },
	})
		.then((dbReviewData) => res.json(dbReviewData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
