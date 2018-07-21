var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const async = require('async');
const bcrypt = require('bcrypt');
var User = require('../../../../../../models/UserSchema.js');
var path = require('path')

const config = require('../../../../../../../config.js');

var api_key = config.api_key;
var DOMAIN = config.DOMAIN;
var EMAIL = config.EMAIL;

var MailgunMustacheMailer = require("mailgun-mustache-mailer");
var data = { domain: DOMAIN, apiKey: api_key, from:EMAIL};
var log = { info: console.log };

var mailgunMustacheMailer = new MailgunMustacheMailer(data, log);


var filepath = path.join(__dirname, '../../../../../../templates/forgot-password-email.html');


module.exports = function (req, res, next) {
  console.log(__dirname)
  // do functions one after another through async waterfall
  async.waterfall([
    function (done) {
      console.log(req.body.username)
      User.findOne({
        username: req.body.username
      }).exec(function (err, user) {
        console.log(user)
        if (user) {
          done(err, user);
        }
        else {
          done('The provided username does not exist. Please try again.');
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
        done(err, user, token);
      })
    },
    function (user, token, done) {
      User.findByIdAndUpdate({ _id: user._id }, { reset_password_token: token, reset_password_expires: Date.now() + 86400000 }, { upsert: true, new: true }).exec(function (err, new_user) {
        done(err, token, new_user);
      });
    },
    function (token, user, done) {
      var template = {
          subject: "Account Recovery Instructions",
          text: "Hello {{name}}!\n",
          html: "<div><p>You requested for a password reset, kindly use this <a href='{{url}}'>link</a> to reset your password</p><br><p>Cheers!</p></div>"
      };

      var recipient = {
          email: "speakpro.help@gmail.com",
          name: user.firstName,
          url : 'http://localhost:4200/#/reset?token=' + token,
          token :token
      };

      mailgunMustacheMailer.send(template, recipient, (error, mailId) => {
          if(error) return console.log(error);
          console.log("New mail was send with id %s", mailId);
      });
    }
  ], function (err) {
    return res.status(422).json({
      message: err
    });
  });
}
