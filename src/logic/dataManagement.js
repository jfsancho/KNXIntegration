import { promises } from 'dns';

const csv = require('csv-parser');
const fs = require('fs');
const fetch = require("node-fetch");




export function generateKey(){
    fetch('https://hound.kinetos.com/api/auth/login', {

        headers: { 'Content-Type' : 'application/json'},
        method: 'post',
        body: JSON.stringify({'nombre' : 'JARAGON', 'contrasenia' : 'JA1234'})

    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log('Created key:', data);
    }).catch(error => console.error('Error:', error));
}

export function sendValueToAPI(pDev,pValue){
    var jsonToSend = {
        ga : pDev.ga,
        dpt : pDev.dpt,
        unit : pDev.unit,
        value : pValue,
        date : getCurrentDateString()
    };
}

export function fetchSaveInfoAPI(pData){
    fetch('https://hound.kinetos.com/api/v1/executeEvent', {

        headers: {
            'Authorization' : 'Bearer eyJhbGciOiJIUzI1NiIsImtpZCI6ImtpZCIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJIUHViQVBJIiwic3ViIjoiSG91bmQiLCJhdWQiOiJ1c2VyIiwiZXhwIjoxNTk5OTY4ODM5LCJuYmYiOjE1Njg4NjQ4MzksImlhdCI6MTU2ODg2NDgzOSwianRpIjoiQUZzbVRTIiwic2Vzc2lvbiI6Ik1vemlsbGEvNS4wIChjb21wYXRpYmxlOyBSaWdvci8xLjAuMDsgaHR0cDovL3JpZ29yLmNvbSlob3VuZC5raW5ldG9zLmNvbSIsImlzQVBJIjp0cnVlfQ.zjCOshZrOZIzshQrC8RCIfTgxSegO4f0AZ0UjD1KXp4', 
            'Content-Type' : 'application/json'},
        method: 'post',
        body: JSON.stringify({
            "evento": 152,
            "flujo": "TELEGRAM",
            "parametros": [pData],
            "disclaimer": true
            })

    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        console.log('Send Data:', data);
    }).catch(error => console.error('Error:', error));
}

export function getCurrentDateString(){
    var t = new Date();
    return t.getFullYear() + '-' + (t.getMonth()+1) + '-' + t.getDate() + ' ' + t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
}

//csv colums: ga control, ga status, dpt, unit, type, description


const KNX_DEVICES_CSV_FILE = './src/data/devices.csv';
 
export async function getKNXDevices(){

    var deviceList = new Set();

    return new Promise((resolve, reject) => {
                fs.createReadStream(KNX_DEVICES_CSV_FILE)
                    .pipe(csv())
                    .on('data', (pRow) => {
                            deviceList.add({
                                ga: pRow['ga status'],
                                dpt: pRow['dpt'],
                                unit: pRow['unit'],
                                dataType: pRow['type'],
                                description: pRow['description']
                        });
                    })
                    .on('end', function () {
                        //console.log('file', deviceList); // This logs the file buffer
                        resolve(deviceList);})
            }) 
    
 }