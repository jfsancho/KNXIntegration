import { promises } from 'dns';

const csv = require('csv-parser');
const fs = require('fs');




export function sendValueToAPI(pDev,pValue){
    var jsonToSend = {
        ga: pDev.ga,
        dpt: pDev.dpt,
        unit: pDev.unit,
        value: pValue
    };
    
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
                        console.log('file', deviceList); // This logs the file buffer
                        resolve(deviceList);})
            }) 
    


    
 }