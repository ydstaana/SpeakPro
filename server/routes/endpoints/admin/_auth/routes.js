const express = require('express');
const router = express.Router();


const login = require('./_v/_v1/login');
const lost_password = require('./_v/_v1/lost_password');
const reset_password = require('./_v/_v1/reset_password');
const confirm_password = require('./_v/_v1/confirm_password');

router.post('/users/login', login);
router.post('/users/lost_password', lost_password);
router.post('/users/reset_password', reset_password);
router.post('/users/confirm_password', confirm_password);

module.exports = router;
