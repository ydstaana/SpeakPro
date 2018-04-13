const express = require('express');
const multer = require('multer');
const router = express.Router();


const get_all_teachers = require('./_v/_v1/get_all_teachers');
const download = require('./_v/_v1/download');
const upload_files = require('./_v/_v1/upload_files');
const view_files = require('./_v/_v1/view_uploaded_files');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  }
})

var upload = multer({ storage: storage });


router.post('/upload', upload.array('avatar',12), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.json(req.files);
  console.log(req.files);
});


router.get('/teachers', get_all_teachers);
router.get('/download/:filename', download);
router.get('/uploads', view_files);
router.post('/uploads', upload_files);


module.exports = router;