const express = require('express');
const router = express.Router();

// body-parser

// database link to express


router.get('/api', (req, res) => {

    res.send('Data comes from here')
    // res.json(data)
})

router.post('/api', (req, res) => {
    
    res.send('Data comes in here')
})


module.exports = router;