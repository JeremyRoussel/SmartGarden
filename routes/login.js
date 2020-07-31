const express = require('express');
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcryptjs');

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', async (req, res) => {

  try {
      let username = req.body.username; //form
      let password = req.body.password; //form

      console.log(username, password);

      let results = await db.users.findAll({ where: { username: username } });
      //results is an array of objects from database 

      if (results.length > 0) {
          //test password 

          bcrypt.compare(password, results[0].password, (err, response) => {
              //there is a match in passwords
              if (response) {
                  req.session.username = username;  //username is an object on the session object
                  req.session.role = 1;
                  res.redirect('/')
              }
              else {
                  //no match found for passwords
                  res.redirect('/error');
              }
          })
      }

  }
  catch {
      res.status(211).redirect('/error')
  }
// body-parser

// database link to express


module.exports = router;