const express = require('express');
const router = express.Router();

// body-parser

// database link to express


router.get('/', (req, res) => {

    res.render('index')
})


module.exports = router;