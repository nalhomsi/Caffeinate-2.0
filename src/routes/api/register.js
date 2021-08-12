const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require("../../models");

const router = express.Router();

// Route used to register a user for the first time
router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    const saltRounds = 10;

    // Check to see if the username or email is already being used
    const alreadyExistsUser = await User.findOne({ where: { username, email }}).catch(
        (err) => {
            console.log("Error: ", err);
    });

    // If the username or email is already being used, return with message
    if (alreadyExistsUser) {
        return res.status(400).json({ message: "User with email already exists!" });
    };

    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hashedPassword) {
            // Create new user
            const newUser = new User({ username, email, hashedPassword });

            const savedUser = newUser.save().catch((err) => {
                console.log("Error: ", err);
                res.json({ message: "Cannot register user at the moment!", error: err });
            });
        
            // If successfully saved, return message
            if(savedUser) {
                res.json({ message: "Thanks for registering!" });
            }
        });
    });
});

module.exports = router;