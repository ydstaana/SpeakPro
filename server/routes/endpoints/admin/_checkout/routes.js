const express = require('express');
const router = express.Router();
const core = require('../../services/core');

const add_to_cart = require('./_v/_v1/add_to_cart');
const checkout = require('./_v/_v1/checkout');


router.post('/cart/add-items', core.verifyToken, add_to_cart);
router.post('/checkout', core.verifyToken, checkout);

module.exports = router;
