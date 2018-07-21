var mongoose = require('mongoose');
var User = require('../../../../../../models/UserSchema.js');
var bcrypt = require('bcrypt');

const config = require('../../../../../../../config.js');

var api_key = config.api_key;
var DOMAIN = config.DOMAIN;
var EMAIL = config.EMAIL;
var MailgunMustacheMailer = require("mailgun-mustache-mailer");
var data = { domain: DOMAIN, apiKey: api_key, from:EMAIL};
var log = { info: console.log };

var mailgunMustacheMailer = new MailgunMustacheMailer(data, log);

module.exports = function (req, res, next) {
  User.findOne({
    reset_password_token: req.body.token,
    reset_password_expires: {
      $gt: Date.now()
    }
  }).exec(function (err, user) {
    if (!err && user) {
      bcrypt.hash(req.body["password"], 10, function (err, hash) {
        if (err) {
          return next(err);
        }
        console.log(hash);
        req.body["password"] = hash;
        User.findOneAndUpdate({ username: user.username }, { reset_password_token: undefined, reset_password_expires: undefined, password: req.body.password }, function (err, post) {
          if (err) res.status(500).json({
            code: 500,
            message: err
          });
          res.status(200).json({
            code: 200,
            message: "Successfully updated user"
          });

          var template = {
              subject: "Password reset",
              text: "Hello {{name}}!\n",
              html: "<div><p>Your password has been successfuly reset, you can now login with your new password.</p><br><div>Cheers!</div>"
          };

          var recipient = {
              email: "speakpro.help@gmail.com",
              name: user.firstName
          };

          mailgunMustacheMailer.send(template, recipient, (error, mailId) => {
              if(error) return console.log(error);
              console.log("New mail was send with id %s", mailId);
          });

        });
      })

    }
    else {
      res.status(500).json({
        code: 500,
        message: 'The reset password token has already expired.'
      });
    }
  })
}
