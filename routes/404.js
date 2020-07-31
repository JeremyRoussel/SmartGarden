const express = require('express');
const router = express.Router();

// body-parser

// database link to express


router.get('/404', (req, res) => {

    res.render('404')
})


module.exports = router;