const express = require('express');
const registerApi = require("./api/register");
const loginApi = require("./api/login");

const router = express.Router();

router.use(registerApi);
router.use(loginApi);

module.exports = router;
