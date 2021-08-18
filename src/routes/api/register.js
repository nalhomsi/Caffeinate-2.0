const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const { Op } = require('sequelize');
const router = express.Router();

// Function to check and see if a message is considered toxic
const isToxic = async (model, message) => {
	const predictions = await model.classify(message);
	const toxicPredictions = predictions.filter((p) => p.results[0].match);

	if (toxicPredictions.length > 0) {
		return true;
	}
};

// Route used to register a user for the first time
router.post('/register', async (req, res) => {
	const { username, email, password } = req.body;

	// Verify that the request is properly formed
	if (!username || !email || !password) {
		res.status(400).json({ message: 'Malformed request' });
		return;
	}

	// Load the toxicity model
	const model = await toxicity.load();

	const saltRounds = 10;

	// Check to see if the username or email is already being used
	const alreadyExistsUser = await User.findOne({
		where: {
			[Op.or]: [{ username: username }, { email: email }],
		},
	}).catch((err) => {
		console.log('Error: ', err);
	});

	// If the username or email is already being used, return with message
	if (alreadyExistsUser) {
		return res
			.status(409)
			.json({ message: 'User with email/username already exists!' });
	}

	// Check to see if the username has toxic elements
	const toxicTest = await isToxic(model, username);
	if (toxicTest) {
		// If it does, do not allow user to register
		res
			.status(409)
			.json({ message: 'Profanity detected, please adjust accordingly' });
		return;
	} else {
		bcrypt.genSalt(saltRounds, async function (err, salt) {
			await bcrypt.hash(password, salt, async function (err, hashedPassword) {
				// Create new user
				const newUser = { username, email, hashedPassword };

				const savedUser = await User.create(newUser)
					.then((savedUser) => {
						res
							.status(200)
							.json({ message: 'Thanks for registering ' + username });
					})
					.catch((err) => {
						console.log(err);
						return res
							.status(400)
							.json(err.errors.map((message) => message.message));
					});
			});
		});
	}
});

module.exports = router;
