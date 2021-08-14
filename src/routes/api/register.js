const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../../models');
const { Op } = require('sequelize');

const router = express.Router();

// Route used to register a user for the first time
router.post('/register', async (req, res) => {
	const { username, email, password } = req.body;

	// Verify that the request is properly formed
	if (!username || !email || !password) {
		res.status(400).json({ message: 'Malformed request' });
		return;
	}

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

	bcrypt.genSalt(saltRounds, function (err, salt) {
		bcrypt.hash(password, salt, function (err, hashedPassword) {
			// Create new user
			const newUser = { username, email, hashedPassword };

			const savedUser = User.create(newUser)
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
});

module.exports = router;
