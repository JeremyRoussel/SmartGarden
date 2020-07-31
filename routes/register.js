const express = require('express');
const router = express.Router();

// body-parser

// database link to express


router.get('/register', (req, res) => {

    res.render('register')
})


module.exports = router;