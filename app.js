require("dotenv").config();
const express = require('express');

const app = express();

const PORT = process.env.PORT


// link to public folder
app.use(express.static('public'));

// link to views folder
app.set('view engine', 'ejs');

// create routes
app.use(require('./routes/index')) // home page, unprotected

app.use(require('./routes/login')) // login page

app.use(require('./routes/register')) // registration page

app.use(require('./routes/user'))  // user homepage and plants

app.use(require('./routes/new'))  // create plant for a user

app.use(require('./routes/plant')) // view data for a plant

app.use(require('./routes/api')) // post data for a plant to database, lookup data for plant

app.use(require('./routes/404')) // error page

app.use(require('./routes/aboutus')) // about us


// Start Server

let server = app.listen(PORT, () => {
    console.log('Listening on port 3000');
})
