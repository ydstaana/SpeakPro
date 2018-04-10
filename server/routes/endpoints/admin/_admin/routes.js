const express = require('express');
const router = express.Router();

const ban_single_user = require('./_v/_v1/ban_single_user');

router.post('/admin/:id', ban_single_user);


module.exports = router;