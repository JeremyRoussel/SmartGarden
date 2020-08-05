const express = require('express');
const { response } = require('express');
const router = express.Router();
const axios = require('axios')
const d3 = require('d3')



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
        // .finally(function () {
        //     // always executed
        // });


    // res.render('plant', {   // Send the required data to the render
    //     plantID: plantID
    // })
})

module.exports = router;