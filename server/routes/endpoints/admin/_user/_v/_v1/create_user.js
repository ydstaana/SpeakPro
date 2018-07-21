var mongoose = require('mongoose');
var User = require('../../../../../../models/UserSchema.js');
const jwt = require('jsonwebtoken');
var path = require('path')
const async = require('async');
const bcrypt = require('bcrypt');

const config = require('../../../../../../../config.js');

var api_key = config.api_key;
var DOMAIN = config.DOMAIN;
var EMAIL = config.EMAIL;

var MailgunMustacheMailer = require("mailgun-mustache-mailer");
var data = { domain: DOMAIN, apiKey: api_key, from:EMAIL};
var log = { info: console.log };

var mailgunMustacheMailer = new MailgunMustacheMailer(data, log);

module.exports = function (req, res, next) {

  // do functions one after another through async waterfall
  async.waterfall([
    function (done) {
	    req.body.newUser = true;
	    req.body.active = false;
		User.create(req.body, function (err, user) {
			if (err) {
				done(err)
			}
		    else{
		    	done(err,user)
		    }
		});
    },
    function (user, done) {
      console.log(user);
      //generate random token
      bcrypt.hash(user.username, 10, function (err, hash) {
        if (err) {
          return done(err);
        }
        var token = hash;
        done(err, token, user);
      })
    },
    function (token, user, done) {
      var template = {
          subject: "Confirm your registration to SpeakPro English School",
          text: "Hello {{name}}!\n",
          html: "<div><p>Thank you for creating an account at SpeakPro, kindly use this <a href='{{url}}'>link</a> to confirm your registration.</p><br><p>Cheers!</p></div>"
      };

      var recipient = {
          email: "speakpro.help@gmail.com",
          name: user.firstName,
          url: 'http://localhost:4200/#/confirm' + '?id=' + user._id + '&token=' + token,
          token :token
      };

      mailgunMustacheMailer.send(template, recipient, (error, mailId) => {
          if (!error) {
            return res.json({
              message: 'Kindly check your email for further instructions'
            })
          }
          else {
            return done(error);
          }
      });
    }
  ], function (err) {
    return res.status(422).json({
      message: err
    });
  });
}
