const express = require('express');
const router = express.Router();

const get_all_teachers = require('./_v/_v1/get_all_teachers');

router.get('/teachers', get_all_teachers);


module.exports = router;