// server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config(); 


const studentRoute = require('./routes/student.route');


mongoose.connect('mongodb://localhost:27017/User', {
})
    .then(() => {
        console.log('Database successfully connected!');
    })
    .catch((error) => {
        console.log('Could not connect to database: ' + error);
    });


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/students', studentRoute);


const port = PORT || 4000;


app.listen(port, () => {
    console.log('Connected to port ' + port);
});


app.use((req, res, next) => {
    res.status(404).send('Error 404: Not Found!');
});


app.use((err, req, res, next) => {
    console.error(err.message);
    const status = err.statusCode || 500;
    res.status(status).send(err.message);
});
