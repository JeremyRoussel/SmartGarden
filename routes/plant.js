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



module.exports = router;