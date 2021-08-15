const express = require('express');
const registerApi = require('./api/register');
const loginApi = require('./api/login');
const authApi = require('./api/auth-api');
const reviewApi = require('./api/review-routes');
const shopApi = require('./api/shop-routes');

const router = express.Router();

// Register API
router.use(registerApi);

// Login API
router.use(loginApi);

// Auth API (/token & /logout)
router.use(authApi);

// Review API
router.use('/reviews', reviewApi);

// Shop API
router.use('/shops', shopApi);

module.exports = router;
