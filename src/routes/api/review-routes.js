const express = require('express');
const { Review, Shop, User } = require('../../models/index');
const router = express.Router();
const passport = require('passport');
require('../../auth/passport')(passport);
const { Op } = require('sequelize');

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
				attributes: ['shopId', 'name', 'address', 'website'],
			},
		],
	})
		.then((dbReviewData) => res.json(dbReviewData))
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

// Get reviews from username
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

// Post Review
router.post(
	'/post',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		const userRating = req.body.rating;
		const postBody = req.body.body;
		const shopId = req.body.shopId;
		const userId = req.user.userId;

		const review = {
			rating: userRating,
			body: postBody,
			userId: userId,
			shopId: shopId,
		};

		if (!userRating || !userId || !shopId) {
			res.status(400).json({ message: 'Malformed Request' });
			return;
		}

		const existingReview = await Review.findOne({
			where: {
				[Op.and]: [{ userId: userId }, { shopId: shopId }],
			},
		});

		if (!existingReview) {
			await Review.create(review).catch((err) => {
				console.log(err);
			});

			res.status(200).json({ message: 'Successfully posted review' });
		} else {
			res.status(403).json({ message: 'You have already left a review!' });
		}
	}
);
module.exports = router;
