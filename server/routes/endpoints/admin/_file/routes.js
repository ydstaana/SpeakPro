const express = require('express');
const router = express.Router();

const get_uploaded_files = require('./_v/_v1/get_uploaded_files');
const core = require('../../services/core');

router.get('/files', core.verifyToken, get_uploaded_files);

module.exports = router;
