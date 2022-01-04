import * as XLSX from 'xlsx';
import * as fs from 'fs';
import * as path from 'path';
import { iniciarMapa } from './meses';
import { flatten } from 'underscore';

const dirIn = path.join(__dirname, `../inDocs`);
const dirOut = path.join(__dirname, '../outDocs');

console.log({ dirIn })
const mapaMeses = new Map();
iniciarMapa(mapaMeses);
const resData = [];
let arrayName = "";

fs.readdir(dirIn, (err, files) => {
    if (err)
        console.log(err);
    else {
        files.forEach(file => {
            if (path.extname(file) == ".xlsx") {
                const workbook = XLSX.readFile(dirIn + '/' + file);
                const sheetnames = Object.keys(workbook.Sheets);

                let i = sheetnames.length;

                while (i--) {
                    const sheetname = sheetnames[i];
                    arrayName = sheetname.toString();
                    resData.push(XLSX.utils.sheet_to_json(workbook.Sheets[sheetname]));
                }
               
            }
        });
        console.log(flatten(resData))
    }
});