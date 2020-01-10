const program = require('commander')
const minimist = require('minimist')
program.parse(process.argv);
let tempName = program.args[0];
let args = minimist(process.argv.slice(2))
if(args.I){
    let install = require("./template/install")
    install(tempName)
}else{
    let download = require("./template/download")
    download(tempName,()=>{});
}