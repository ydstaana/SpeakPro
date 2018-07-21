var hbs = require('nodemailer-express-handlebars'),
var path = require('path')
var nodemailer = require('nodemailer');
var email = "speakproenglishschool@gmail.com"
var pass = "Sp3akproschool"

var smtpTransport = nodemailer.createTransport({
  service: process.env.MAILER_SERVICE_PROVIDER || 'Gmail',
  auth: {
    user: email,
    pass: pass
  }
});

var handlebarsOptions = {
  viewEngine: 'handlebars',
  viewPath: path.resolve('../../../../../../templates/'),
  extName: '.html'
};

smtpTransport.use('compile', hbs(handlebarsOptions));