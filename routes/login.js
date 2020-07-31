const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../models'); 
const bodyParser = require('body-parser');

// body-parser
let urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/login', (req, res) => {
  res.render('login');
})

// database link to express
router.post('/login', async (req, res) => {

  try {
      let email = req.body.email; // form
      let password = req.body.password; // form

      let results = await db.users.findAll({ where: {email: email}});
      // results is an array of objects from database 

      if (results.length > 0) {
          // test password 

          bcrypt.compare(password, results[0].password, (err, response) => {
              // there is a match in passwords
              if (response) {
                  req.session.email = email;  // username is an object on the session object
                  req.session.role = 1;
                  res.redirect('/')
              }
              else {
                  // no match found for passwords
                  res.redirect('/error');
              }
          })
      }

  }
  catch {
      res.status(211).redirect('/error')
  }

})

module.exports = router;