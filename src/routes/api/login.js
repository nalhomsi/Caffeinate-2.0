const express = require('express');
const { User } = require('../../models/index');
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/login", async (req, res) => {

    const email = req.body.email;
    const hashedPassword = req.body.password;

    const userWithEmail = await User.findOne({ where: { email } }).catch((err) => {
        console.log("Error: ", err);
    });

    if(!userWithEmail)
        return res.json({ message: "Email or password does not match!" });

    if(userWithEmail.hashedPassword !== hashedPassword)
        return res.json({ message: "Email or password does not match!" });

    const jwtToken = jwt.sign({ id: userWithEmail.id, email: userWithEmail.email }, process.env.JWT_SEC);
    res.json({ message: "Welcome back!", token: jwtToken });
});

module.exports = router;