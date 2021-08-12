const express = require('express');
const { Review, Shop, User } = require('../../models/index');
const router = express.Router();
const sequelize = require('../../config/connection');
const { Op } = require('sequelize');

// Get all Shops
router.get('/', (req, res) => {
	// Find all Shops...
	Shop.findAll({
		// Hide shopId
		attributes: { exclude: ['shopId'] },
		include: [
			{
				// Only return rating, body and date
				model: Review,
				attributes: ['rating', 'body', 'date'],
				include: [
					{
						// Only return username
						model: User,
						attributes: ['username'],
					},
				],
			},
		],
	})
		.then((dbShopData) => {
			if (!dbShopData) {
				res.status(404).json({ message: 'No results found.' });
				return;
			}
			res.status(200).json(dbShopData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// Get Shop by Name
router.get('/:name', (req, res) => {
	// Find all shops
	Shop.findAll({
		// Hide shopId
		attributes: { exclude: ['shopId'] },
		// Include shop reviews
		include: [
			{
				// Only return rating, body and date
				model: Review,
				attributes: ['rating', 'body', 'date'],
				include: [
					{
						// Only return username
						model: User,
						attributes: ['username'],
					},
				],
			},
		],
		// with similar name
		where: {
			name: { [Op.like]: `%${req.params.name}%` },
		},
	})
		.then((dbShopData) => {
			if (!dbShopData) {
				res.status(404).json({ message: 'No results found.' });
				return;
			}
			res.status(200).json(dbShopData);
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

module.exports = router;
