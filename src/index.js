import bodyParser from 'body-parser';

import cors from 'cors';


import * as test from './logic/dataManagement'

var testData= [{
  ga : '0/0/1',
  dpt : 'DPT9.001',
  unit : 'C',
  value : '24',
  date : test.getCurrentDateString()
},{
  ga : '0/0/1',
  dpt : 'DPT9.001',
  unit : 'C',
  value : '25',
  date : test.getCurrentDateString()
},{
  ga : '0/0/1',
  dpt : 'DPT9.001',
  unit : 'C',
  value : '26',
  date : test.getCurrentDateString()
}]
console.log(testData);
var result = test.getKNXDevices(); 
//test.generateKey();
testData.map((item)=>{test.fetchSaveInfoAPI(item)});
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