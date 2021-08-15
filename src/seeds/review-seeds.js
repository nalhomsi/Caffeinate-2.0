const { Review } = require('../models');

const reviewData = [
	{
		rating: 5,
		body: 'wow so good',
		userId: 1,
		shopId: 1,
	},
	{
		rating: 5,
		body: 'wow so good',
		userId: 2,
		shopId: 1,
	},
	{
		rating: 3,
		body: 'alright',
		userId: 2,
		shopId: 1,
	},
	{
		rating: 5,
		body: 'wow so good',
		userId: 3,
		shopId: 3,
	},
	{
		rating: 4,
		body: 'wow so good',
		userId: 3,
		shopId: 1,
	},
	{
		rating: 4,
		body: 'wow so good',
		userId: 4,
		shopId: 1,
	},
	{
		rating: 1,
		body: 'horrible',
		userId: 5,
		shopId: 1,
	},
	{
		rating: 1,
		body: 'horrible',
		userId: 5,
		shopId: 1,
	},
];

const seedReviews = () => Review.bulkCreate(reviewData);

module.exports = seedReviews;
