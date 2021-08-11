const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../../models/index');
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    // Attempt to pull user from DB
    const userWithEmail = await User.findOne({ where: { email } }).catch((err) => {
        console.log("Error: ", err);
    });

    // Check to see if the email is being used
    if (!userWithEmail) return res.json({ message: "Email or password does not match!" });

    // Compare plain text password with hashed password stored in DB
    bcrypt.compare(password, userWithEmail.hashedPassword, function(err, result) {
        if (result == true) {
            // Assign JWT upon success
            const jwtToken = jwt.sign({ id: userWithEmail.id, email: userWithEmail.email }, process.env.JWT_SEC);
            res.json({ message: "Successfully signed in", token: jwtToken });
        }
        else {
            // Passwords do not match
            return res.json({ message: "Email or password does not match!" });
        }
    })
});

module.exports = router;