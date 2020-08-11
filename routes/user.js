const express = require('express');
const { response } = require('express');
const router = express.Router();
const db = require('../models'); //Require db from models directory
const bodyParser = require('body-parser');//parse the bodies of all incoming requests
const auth = require('../auth/auth'); //function to protect the route

router.get('/user(/)?(:id)?', (req, res) => {

    console.log("made into router.get");
   
        let user = req.params.id  // Identify the parameter from the URI
           
        db.plants.findAll()
            .then(results => {
                res.render('user', {
                    plants: results
                })
            })
                    
        .catch((error => {
            res.redirect('/404'); 
        }))
})


//Capture Plant Name and Plant Type from user.ejs
router.post('/user', async (req, res) => {

     
    try {
        
        let plantName = req.body.plantName;
        let plantType = req.body.plantType;
        let results = await db.users.findAll({ where: {email: req.session.email}});
    
        console.log(`plantName: ${plantName} plantType: ${plantType} results: ${results}`)
        if(results.length > 0) {
            
            //creates the attributes in the plants table for plantType and plantName
            db.plants.create({
                plantOwner: results[0].id,  //first index of findall where email matches
                plantName: plantName,
                plantType: plantType         
            })
            .then(user => {

                res.redirect('/user')                
            })
            
            .catch(error => {
                console.log('error inside of create catch');
                res.redirect('/404'); //will redirect to 404 error page
            })
        }
    }
    catch(error) {
        console.log('error inside of try catch', error);
        res.status(211).redirect('/404');
    }
    
   
    
})

module.exports = router;