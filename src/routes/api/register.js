const express = require('express');
const User = require("../../models/user");

const router = express.Router();

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    // Check to see if the username or email is already being used
    const alreadyExistsUser = await User.findOne({ where: { username, email }}).catch(
        (err) => {
            console.log("Error: ", err);
    });

    // If the username or email is already being used, return with message
    if (alreadyExistsUser) {
        return res.json({ message: "User with email already exists!" });
    };

    // Create new user
    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save().catch((err) => {
        console.log("Error: ", err);
        res.json({ error: "Cannot register user at the moment!" });
    });

    // If successfully saved, return message
    if(savedUser) {
        res.json({ message: "Thanks for registering! "});
    }

});

module.exports = router;