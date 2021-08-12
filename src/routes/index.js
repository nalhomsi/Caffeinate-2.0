const express = require('express');
const registerApi = require("./api/register");
const loginApi = require("./api/login");
const authApi = require("./api/auth-api");

const router = express.Router();

// Register API
router.use(registerApi);

// Login API
router.use(loginApi);

// Auth API (/token & /logout)
router.use(authApi);

module.exports = router;
