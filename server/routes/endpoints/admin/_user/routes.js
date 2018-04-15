const express = require('express');
const router = express.Router();

const get_single_user = require('./_v/_v1/get_single_user');
const get_all_users = require('./_v/_v1/get_all_users');
const create_user = require('./_v/_v1/create_user');
const update_user = require('./_v/_v1/update_user');
const core = require('../../services/core');


router.get('/', function (req, res, next) {
  res.send(200, 'Api Works');
});

router.get('/users', core.verifyToken, get_all_users);
router.get('/users/:id', core.verifyToken, get_single_user);
router.post('/users', create_user);
router.put('/users/:username', core.verifyToken, update_user);

module.exports = router;
