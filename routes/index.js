const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const db = require('../models');
const bodyParser = require('body-parser');

// body-parser
let urlencodedParser = bodyParser.urlencoded({extended: false});

router.get('/', (req, res) => {
  res.render('index');
})

// database link to express
router.post('/', async (req, res) => {

    try {
      
    }
    
    catch {
      res.status(404).redirect('/error');
    }
})




module.exports = router;