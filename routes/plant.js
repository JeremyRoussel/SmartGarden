const express = require('express');
const { response } = require('express');
const router = express.Router();
const axios = require('axios')
const d3 = require('d3')
const db = require('../models'); //Require db from models directory
const bodyParser = require('body-parser');//parse the bodies of all incoming requests


router.get('/plant/(:id)?', (req, res) => {

    let plantID = req.params.id

    axios.get(`/api/plant/${plantID}`, { proxy: { host: '127.0.0.1', port: 3000 } })
        .then(function (data) {
            // console.log(data);
            res.render('plant', {
                plantID: plantID,
                data: data
            })
            
        })
        .catch(function (error) {
            res.render('404',{
                error: error
            })
            // console.log(error);
        })

})



//Capture Plant Name and Plant Type from plant.ejs
router.post('/plant', async (req, res) => {

     
    try {

        console.log(`email address on the session: ${req.session.email}`)
        
        let plantName = req.body.plantName;
        let plantType = req.body.plantType;
        let results = await db.users.findAll({ where: {email: req.session.email}});
    
        console.log(`plantName: ${plantName} plantType: ${plantType} results: ${results}`)
        if(results.length > 0) {
            console.log(results);
            //creates the attributes in the plants table for plantType and plantName
            db.plants.create({
                plantOwner: results[0].id,  //first index of findall where email matches
                plantName: plantName,
                plantType: plantType         
            })
            .then(user => {

                res.send('database create a record')
                
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