const express = require('express');
const router = express.Router();
const jwt    = require('jsonwebtoken');
const multer = require('multer');

var User = require('../models/UserSchema.js');
var Schedule = require('../models/SchedSchema.js');

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
const upload = multer({ dest: "uploads/" });

router.post('/upload', upload.single('document'), async (req, res, err) => {
  if (err) res.sendStatus(400);
  else{
    res.json();
  }
})

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
        const payload = {
          id : user._id,
          userType : user.userType,
          username : user.username,
          organization: user.organization
        }

        var token = jwt.sign(payload, secret, {
          expiresIn : 3600 // expires in 1 hour
        });


         res.json({
            id : user._id, 
            success: true,
            message : "Token generated",
            token : token
         });
      }
    }
  });
});


/*JWT Routes Middleware*/
/*router.use(function(req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.params.token || req.headers['x-access-token'] || req.headers['authorization'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, secret, function(err, decoded) {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });

  }
});*/

/*-------------------------USERS-------------------------*/
/* SAVE User */
router.post('/user', function(req, res, next) {
  User.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
/*-------------------------TEACHERS-------------------------*/
router.get('/teachers', (req, res, next) => {
  User.find({userType: "TEACHER"}, function(err, users){
  	if (err) return next(err);
  	res.json(users);
  });
});


/*-------------------------CLASSES-------------------------*/
//GET ALL CLASSES
router.get('/class', (req, res, next) => {
  Schedule.find({}, function(err, users){
    if (err) return next(err);
    res.json(users);
  });
});

//GET ALL AVAILABLE CLASSES
router.get('/class/available', (req, res, next) => {
  Schedule.find({available : true}, function(err, users){
    if (err) return next(err);
    res.json(users);
  });
});

//GET ALL CLASSES OF A SINGLE TEACHER
router.get('/class/:id', (req, res, next) => {
  Schedule.find({teacher : req.params.id}, function(err, users){
    if (err) return next(err);
    res.json(users);
  });
});

//GET AVAILABLE CLASSES OF A SINGLE TEACHER
router.get('/class/:id', (req, res, next) => {
  Schedule.find({available: true, teacher : req.params.id}, function(err, users){
    if (err) return next(err);
    res.json(users);
  });
});

//ADD A CLASS
router.post('/class', function(req, res, next) {
  Schedule.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});




module.exports = router;