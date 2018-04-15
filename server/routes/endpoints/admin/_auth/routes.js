const express = require('express');
const router = express.Router();


const login = require('./_v/_v1/login');

router.post('/users/login', login);

module.exports = router;