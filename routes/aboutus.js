const express = require('express');
const router = express.Router();

// body-parser

// database link to express


router.get('/aboutus', (req, res) => {

    res.render('aboutus')
})


module.exports = router;