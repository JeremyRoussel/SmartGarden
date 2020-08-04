const express = require('express');
const router = express.Router();
const db = require('../models'); // Require db from models directory


// body-parser
// let urlencodedParser = bodyParser.urlencoded({extended: false});


// database link to express

router.get('/user(/)?(:id)?', (req, res) => {

    let user = req.params.id  // Identify the parameter from the URI 

    db.plants.findAll()
    .then(results => {
        res.render('user', {
            plants: results,
        })
    })
    .catch((error => {
        res.redirect('/404'); 
    }))
})


module.exports = router;