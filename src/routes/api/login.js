const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../../models/index');
const jwt = require("jsonwebtoken");
const passport = require("passport");
require('../../auth/passport')(passport);

const router = express.Router();

router.post("/login", async (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    // Attempt to pull user from DB
    const userWithEmail = await User.findOne({ where: { email } }).catch((err) => {
        console.log("Error: ", err);
    });

    // Check to see if the email is being used
    if (!userWithEmail) return res.status(401).json({ message: "Email or password does not match!" });

    // Compare plain text password with hashed password stored in DB
    bcrypt.compare(password, userWithEmail.hashedPassword, function(err, result) {
        if (result == true) {
            // Create access token
            const accessToken = jwt.sign({ id: userWithEmail.id }, process.env.ACCESS_TOKEN_SECRET, {
                algorithm: "HS256",
                expiresIn: process.env.ACCESS_TOKEN_LIFE
            });

            // Create refresh token
            const refreshToken = jwt.sign({ id: userWithEmail.id }, process.env.REFRESH_TOKEN_SECRET, {
                algorithm: "HS256",
                expiresIn: process.env.REFRESH_TOKEN_LIFE
            });

            // Assign refresh token to user in DB
            userWithEmail.refreshToken = refreshToken;
            userWithEmail.save();

            
            res.status(200).json({ 
                message: "Successfully signed in",
                id: userWithEmail.id,
                accessToken: accessToken,
                refreshToken: refreshToken
             }).send()
        }
        else {
            // Passwords do not match
            return res.status(401).json({ message: "Email or password does not match!" });
        }
    })
});

// Validate user authentication test
router.get("/test", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.status(200).json({ message: "Authorized" }).send();
})

module.exports = router;