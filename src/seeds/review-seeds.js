const { Review } = require('../models');

const reviewData = [
	{
		rating: 5,
		body: 'wow so good',
		user: 1,
		shop: 1,
	},
	{
		rating: 5,
		body: 'wow so good',
		user: 2,
		shop: 1,
	},
	{
		rating: 3,
		body: 'alright',
		user: 2,
		shop: 1,
	},
	{
		rating: 5,
		body: 'wow so good',
		user: 3,
		shop: 3,
	},
	{
		rating: 4,
		body: 'wow so good',
		user: 3,
		shop: 1,
	},
	{
		rating: 4,
		body: 'wow so good',
		user: 4,
		shop: 1,
	},
	{
		rating: 1,
		body: 'horrible',
		user: 5,
		shop: 1,
	},
	{
		rating: 1,
		body: 'horrible',
		user: 5,
		shop: 1,
	},
];

const seedReviews = () => Review.bulkCreate(reviewData);

module.exports = seedReviews;
