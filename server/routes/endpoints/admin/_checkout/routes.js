const express = require('express');
const router = express.Router();
const core = require('../../services/core');

const checkout = require('./_v/_v1/checkout');

router.post('/checkout', core.verifyToken, checkout);

module.exports = router;
