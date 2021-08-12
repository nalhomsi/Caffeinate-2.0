const express = require('express');
const jwt = require('jsonwebtoken');
const { User } = require('../../models/index');
const router = express.Router();

router.post('/token', async (req, res) => {
    const refreshToken = req.body.token;
    const userRefreshToken = await User.findOne({where: { refreshToken } }).catch((err) => {
        console.log(err);
    })
    if (refreshToken == null) return res.sendStatus(401)
    if (userRefreshToken == null) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
            algorithm: "HS256",
            expiresIn: process.env.ACCESS_TOKEN_LIFE
        });
        res.json({ accessToken: accessToken })
    });
})

router.delete('/logout', async (req, res) => {
    const refreshToken = req.body.token;
    const userRefreshToken = await User.findOne({where: { refreshToken } }).catch((err) => {
        console.log(err);
    })
    userRefreshToken.refreshToken = null;
    await userRefreshToken.save();
    res.sendStatus(204)
})

module.exports = router;