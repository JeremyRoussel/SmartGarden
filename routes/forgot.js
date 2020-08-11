const express = require('express');
const router = express.Router();
const async = require("async");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const bcrypt = require('bcryptjs'); //Require bcrypt
const db = require('../models'); //Require db from models directory
const bodyParser = require('body-parser');//parse the bodies of all incoming requests

// body-parser
let urlencodedParser = bodyParser.urlencoded({extended: false});





router.get('/forgot', (req, res) => {
  res.render('forgot');
})

router.post('/forgot', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      db.users.findAll({ where: {email: email}, function(err, users) {
        if (!users) {
          req.flash('error', 'No account with that email address exists.');
          return res.redirect('/forgot');
        }

        users.resetPasswordToken = token;
        users.resetPasswordExpires = Date.now() + 3600000; // 1 hour

        users.save(function(err) {
          done(err, token, user);
        });
      }
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail', 
        auth: {
          email: 'learntocodeinfo@gmail.com',
          password: process.env.GMAILPW
        }
      });
      var mailOptions = {
        to: users.email,
        from: 'SmartGarden@gmail.com',
        subject: 'SmartGarden Password Reset',
        text: 'You are receiving this because you (or someone else) has requested to reset the password for your account.\n\n' +
          'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
          'http://' + req.headers.host + '/reset/' + token + '\n\n' +
          'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        console.log('mail sent');
        req.flash('success', 'An e-mail has been sent to ' + users.email + ' with further instructions.');
        done(err, 'done');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgot');
  });
});

module.exports = router;