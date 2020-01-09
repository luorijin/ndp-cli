const program = require('commander')
const tempMap = require('../template/map.json')
const generate = require('../lib/template/generate')
const download = require("../lib/template/download")

program.parse(process.argv);
let tempName = program.args[0];
let projectName = program.args[1];
if(tempMap[tempName]){
    generate(tempName,projectName)
}else{
    download(tempName,()=>{
        generate(tempName,projectName)
    });
}