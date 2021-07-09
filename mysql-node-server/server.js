const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors'); 
var app = express();
var dbConn = require('./config/db.config');

import OlympicWinnersService from './olympicWinnersService';

app.use(function(req, res, next) {  
    res.header("Access-Control-Allow-Origin", "*");  
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");  
    res.header("Access-Control-Allow-Methods","POST, GET, PUT, DELETE, OPTIONS");  
    next();  
}); 

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

app.get('/olympicWinners' , (req, res) => {
    dbConn.query('SELECT * FROM sample_data.olympic_winners', (err, rows, fields) => {
        if (!err){
            res.send(rows);
        }
        else{
            console.log(err);
        }
    });
});

app.post('/olympicWinners', function (req, res) {
    OlympicWinnersService.getData(req.body, (rows, lastRow) => {
        res.json({rows: rows, lastRow: lastRow});
    });
});

app.listen(8000, () => {
    console.log('Started on localhost:8000');
});