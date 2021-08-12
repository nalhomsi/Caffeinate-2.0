const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../../models/index');
const router = express.Router();

// Route used to validate refresh token in case of an expired access token and provide a new access token if necessary
router.post('/token', async (req, res) => {

    // Gets the refresh token from the body of the request
    const refreshToken = req.body.token;

    // Finds the user where the refresh token matchces
    const userRefreshToken = await User.findOne({where: { refreshToken } }).catch((err) => {
        console.log(err);
    })

    // If the token is missing in the response, send 401
    if (refreshToken == null) return res.sendStatus(401);

    // If the user is missing a refresh token in the DB, send 403
    if (userRefreshToken == null) return res.sendStatus(403);

    // If the user has a refresh token, verify that it is still valid
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        
        // If refresh token is invalid, send 403
        if (err) return res.sendStatus(403)

        // Else, generate a new access token for the user and send in a response
        const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: process.env.ACCESS_TOKEN_LIFE
        });
        res.status(200).json({ accessToken: accessToken });
    });
})

// Route use to remove the user's refresh token from the database, will require front end to remove the access token
router.delete('/logout', async (req, res) => {

    // Gets the refresh token from the body of the request
    const refreshToken = req.body.token;

    // Finds the user where the refresh token matches
    const userRefreshToken = await User.findOne({where: { refreshToken } }).catch((err) => {
        console.log(err);
    })

    // Sets the token to null
    userRefreshToken.refreshToken = null;
    await userRefreshToken.save();
    res.sendStatus(204);
})

module.exports = router;