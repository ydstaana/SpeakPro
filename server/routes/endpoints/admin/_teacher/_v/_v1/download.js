var mongoose = require('mongoose');
var Schedule = require('../../../../../../models/SchedSchema.js');
var User = require('../../../../../../models/UserSchema.js');

// Imports the Google Cloud client library
const Storage = require('@google-cloud/storage');

// Creates a client
const storage = new Storage();

const bucketName = 'teacher-materials';

module.exports = function(req, res, next){
	console.log(req.params.filename);
	const srcFilename = req.params.filename;
	const destFilename = __dirname + "/" + req.params.filename

	const options = {
	  // The path to which the file should be downloaded, e.g. "./file.txt"
	  destination: destFilename,
	};

	// Downloads the file
	storage
	  .bucket(bucketName)
	  .file(srcFilename)
	  .download(options)
	  .then(() => {
	    console.log(
	      `gs://${bucketName}/${srcFilename} downloaded to ${destFilename}.`
	    );
	  })
	  .catch(err => {
	    console.error('ERROR:', err);
	  });
}

