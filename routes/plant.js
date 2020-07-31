const express = require('express');
const router = express.Router();

// body-parser

// database link to express


router.get('/plant/(:id)?', (req, res) => {

    let plantID = req.params.id  // Identify the parameter from the URI 


    res.render('plant', {   // Send the required data to the render
        plantID: plantID,
    })
})


module.exports = router;