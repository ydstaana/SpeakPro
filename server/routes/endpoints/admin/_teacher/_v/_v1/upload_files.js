var mongoose = require('mongoose');
const multer = require('multer');
var Schedule = require('../../../../../../models/SchedSchema.js');
var User = require('../../../../../../models/UserSchema.js');


var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + Date.now());
  }
})

var upload = multer({ storage: storage })

var fileUpload = upload.array('avatar',12);

module.exports = fileUpload;

