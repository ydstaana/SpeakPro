const express = require('express');
const router = express.Router();
var cors = require('cors')
const jwt = require('jsonwebtoken');

var secret = "speakpro"

router.use(cors());

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

/*JWT Routes Middleware*/
router.use(function(req, res, next) {

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
});

module.exports = router;
