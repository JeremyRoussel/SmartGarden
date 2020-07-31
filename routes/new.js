const express = require('express');
const router = express.Router();

// body-parser

// database link to express


router.get('/new', (req, res) => {

    res.render('new')
})


module.exports = router;