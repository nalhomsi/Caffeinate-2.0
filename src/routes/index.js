const express = require('express');
const registerApi = require("./api/register");
const loginApi = require("./api/login");
const authApi = require("./api/auth-api")

const router = express.Router();

router.use(registerApi);
router.use(loginApi);
router.use(authApi);

module.exports = router;
