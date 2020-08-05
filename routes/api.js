const express = require('express');
const router = express.Router();
const auth = require('../auth/auth'); //function to proctect the route
const db = require('../models'); //Require db from models directory
const bodyParser = require('body-parser');//parse the bodies of all incoming requests


// body-parser
let jsonParser = bodyParser.json()


//Capture inbound data and add to database

router.post('/api', jsonParser, (req, res) => {

    let plantID = req.body.plantID;
    let temperature = req.body.temperature;
    let moisture = req.body.moisture;
    let light = req.body.light;
    let humidity = req.body.humidity;

    console.log(`plantID: ${plantID}, temperature: ${temperature}, moisture: ${moisture}, light: ${light}, humidity: ${humidity}`);

    db.data.create({
        plantID: plantID,
        humidity: humidity,
        light: light,
        temperature: temperature,
        moisture: moisture
    })
    .then(user => {
        console.log('Success');
        res.send('Success')
    })
    .catch(error => {
        res.send(`Failure of type: ${error}`)
    })
})

// router.get('/api', auth, (req, res) => {

//     res.send('Data comes from here')
//     // res.json(data)
// })

// Ask for plants from a specific user
router.get('/api/user/:id', (req, res) => {

    let userID = parseInt(req.params.id) //turn string into integer value of plant ID

    db.plants.findAll({
        where: {
            plantOwner: userID
        }
    })
    .then((result) => {
        res.send(result)
    })
    .catch((error) => {
        res.send(error)
    })
    
})

// Ask for data about a specific plant
router.get('/api/plant/:id', (req, res) => {

    let plantID = parseInt(req.params.id) //turn string into integer value of plant ID

    db.data.findAll({
        where: {
            plantID: plantID
        }
    })
    .then((result) => {
        res.send(result)
    })
    .catch((error) => {
        res.send(error)
    })

})


module.exports = router;