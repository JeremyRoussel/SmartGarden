const express = require('express');
const router = express.Router();

// body-parser

// database link to express


router.get('/user(/)?(:id)?', (req, res) => {

    let user = req.params.id  // Identify the parameter from the URI 


    res.render('user', {   // Send the required data to the render
        user: user,
    })
})


module.exports = router;