import bodyParser from 'body-parser';

import cors from 'cors';


import * as test from './logic/dataManagement'

var result = test.getKNXDevices(); 
console.log(result); 

var express = require('express'),
  app = express(),
  port = process.env.PORT || 3001;


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.get('/', (req, res) => {
    return res.send('Received a GET HTTP method');
  });
  
app.post('/', (req, res) => {
    return res.send('Received a POST HTTP method');
  });
  
app.put('/', (req, res) => {
    return res.send('Received a PUT HTTP method');
});
  
app.delete('/', (req, res) => {
    return res.send('Received a DELETE HTTP method');
});



app.listen(port);


console.log(' RESTful API server started on: ' + port);