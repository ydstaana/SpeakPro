const express = require('express');
const router = express.Router();
const jwt    = require('jsonwebtoken');
const multer = require('multer');
const bcrypt = require('bcrypt');

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

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })



router.post('/upload', upload.single('avatar'), function (req, res, next) {
  console.log(upload.onprogress);
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
  res.json(req.file);
  console.log(req.files);
})

router.get('/login/:username/:password', function(req,res,next){
  User.authenticate(req.body.username, req.body.password, function(err,user){
    if(err) return next(err);
    res.json(user);
  })
})
/*router.get('/login/:username/:password', function(req, res, next) {
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
*/

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
router.get('/user', function(req, res, next) {
  User.find({}, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE User */
router.post('/user', function(req, res, next) {
  User.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE User */
router.put('/user/:id', function(req, res, next) {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/*GET SINGLE USER*/
router.get('/user/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});



/*-------------------------STUDENTS-------------------------*/
router.get('/students', (req, res, next) => {
  User.find({userType: "STUDENT"}, function(err, users){
    if (err) return next(err);
    res.json(users);
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
  Schedule.find({available : true})
  .populate('teacher', 'firstName lastName')
  .exec(function(err, schedule){
    if(err) return next(err);
    console.log(schedule);
    res.json(schedule);
  });;
});

//GET ALL CLASSES OF A SINGLE TEACHER
router.get('/class/teacher/:id', (req, res, next) => {
  Schedule.find({teacher : req.params.id}, function(err, users){
    if (err) return next(err);
    res.json(users);
  });
});

//GET AVAILABLE CLASSES OF A SINGLE TEACHER
router.get('/class/teacher/:id/available', (req, res, next) => {
  Schedule.find({available: true, teacher : req.params.id})
  .populate('teacher', 'firstName')
  .exec(function(err, schedule){
    if(err) return next(err);
    res.json(schedule);
  });
});


//GET ENROLLED CLASSES OF A SINGLE STUDENT
router.get('/class/student/:id', (req, res, next) => {
  User.findById(req.params.id)
  .populate('schedule')
  .exec(function(err, user){
    if(err) return next(err);
    res.json(user.schedule);
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