require("dotenv").config();
const express = require('express');

const app = express();

const bodyParser = require('body-parser');

const session = require('express-session');

const cookieParser = require('cookie-parser');

const db = require('./models');

const PORT = process.env.PORT

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());//req.body(fill everything that client is sending back to us)

// link to public folder
app.use(express.static('public'));

// link to views folder
app.set('view engine', 'ejs');

app.use(session({
    secret: 'cat',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false, maxAge: 14 * 24 * 60 * 60 * 1000}
}))

// create routes
app.use(require('./routes/index')); // home page, unprotected

app.use(require('./routes/login')); // login page

app.use(require('./routes/register')); // registration page

app.use(require('./routes/user'));  // user homepage and plants

app.use(require('./routes/new'));  // create plant for a user

app.use(require('./routes/plant')); // view data for a plant

app.use(require('./routes/api')); // post data for a plant to database, lookup data for plant

app.use(require('./routes/404')); // error page

app.use(require('./routes/aboutus')); // about us

app.use(require('./routes/forgot')); // reset user password



const {
    Board,
    Thermometer,
    pResistor,
    mSensor,
    Sensor,
} = require('johnny-five');

const board = new Board();

board.on('ready', () => {
    // Create a new `photoresistor` hardware instance.
    const pResistor = new Sensor({
        pin: 'A0',
        freq: 60000,
    });
    const thermometer = new Thermometer({
        controller: 'LM35',
        pin: 'A3',
        freq: 60000,
    });
    const mSensor = new Sensor({
        pin: 'A5',
        freq: 60000,
    });

    // Inject the `sensor` hardware into
    // the Repl instance's context;
    // allows direct command line access
    board.repl.inject({
        pot: pResistor,
    });

    // "data" get the current reading from the photoresistor
    pResistor, thermometer, mSensor.on('data', () => {
        console.log('Light level: ', pResistor.scaleTo([0, 150]), '%');
        const { fahrenheit } = thermometer;
        // console.log(' Temperature: ', fahrenheit, 'F');
        // console.log('Moisture:');
        // console.log(
        //     Math.round(Math.abs(((mSensor.value - 210) / 242) * 100 - 100)),
        //     '%');

        // console.log('--------------------------------------');
        let Moisture = Math.round(Math.abs(((mSensor.value - 210) / 242) * 100 - 100));
        db.data.create({plantID: 1, light: pResistor.scaleTo([0, 150]), temperature: Math.round(fahrenheit), moisture: Moisture})
        .then(function(result){
            // console.log(result);
        })
    });
});

// Start Server

let server = app.listen(PORT, () => {
    console.log('Listening on port 3000');
})
