const express = require('express');
const passport = require('passport');
const registerApi = require("./api/register");
const loginApi = require("./api/login");
const testApi = require("./api/auth-api-test")

const router = express.Router();

router.use(registerApi);
router.use(loginApi);
router.use(testApi);

module.exports = router;
