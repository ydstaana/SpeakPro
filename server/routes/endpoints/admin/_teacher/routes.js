const express = require('express');
const router = express.Router();

const get_all_teachers = require('./_v/_v1/get_all_teachers');
const upload_files = require('./_v/_v1/upload_files');
const view_files = require('./_v/_v1/view_uploaded_files');

router.get('/teachers', get_all_teachers);
router.get('/download/:filename', upload_files);
router.get('/uploads', view_files);


module.exports = router;