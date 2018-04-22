var mongoose = require('mongoose');
const multer = require('multer');
const moment = require('moment')
const pify = require('pify')
var Schedule = require('../../../../../../models/SchedSchema.js');
var File = require('../../../../../../models/FileSchema.js');
var User = require('../../../../../../models/UserSchema.js');

var currentDate = moment().format("DD-MM-YYYY");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null,  file.originalname + "_" + currentDate);
  }
})

var upload = multer({ storage: storage })

const fileUpload = pify(upload.array('files_field')); //Promisify upload

var uploadFile = async function (req, res) {
  try {
    await fileUpload(req, res)
    // Everything went fine
    for(item of req.files){
      console.log(item);
      var newFile = {
        fileName : item.filename,
        displayName: item.originalname,
        author: req.body.user, //change this to the appropriate field in req.body from frontend
        uploadDate : moment().format('l'),
        fileSize: item.size
      }
      File.create(newFile, function(err, file){
        console.log(file);
      })
    }
  } catch(err) {
    // An error occurred when uploading 
    return
  }
}

module.exports = uploadFile;
