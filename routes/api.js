const express = require('express');
const router = express.Router();
const auth = require('../auth/auth'); //function to protect the route
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

router.get('/api', auth, (req, res) => {

    res.send('Data comes from here')
    // res.json(data)
})


module.exports = router;