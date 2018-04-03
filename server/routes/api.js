const express = require('express');
const router = express.Router();

var User = require('../models/UserSchema.js');
/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

//TO DO
/*CREATE API FOR 
-getting list of available classes
-adding a class to a teacher
-adding a class to a student
-upload 
-view uploads
-
*/
router.get('/teachers', (req, res, next) => {
  User.find({userType: "TEACHER"}, function(err, users)){
  	if (err) return next(err);
  	res.json(users);
  }
});



/* SAVE User */
router.post('/user', function(req, res, next) {
  User.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/login/:username/:password', function(req, res, next) {
  User.findOne({username: req.params.username}, function (err, user) {
    if (err) return next(err);
    
    if(!user){
      res.json({success: false, message: 'Auth failed. User not found'});
    }
    else{

      if(user.password != req.params.password) {
        res.json({success: false, message: 'Incorrect password'});
      }
      else{
         res.json({
            id : user._id, 
            success: true,
            message : "Logging in",
         });
      }
    }
  });
});

module.exports = router;