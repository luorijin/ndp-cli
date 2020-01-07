const path = require("path")
const spawn = require('child_process').spawnSync
module.exports = function(env,mode){
    let args = {
        dev:path.join(__dirname,'../','./lib/dev.js'),
        build:path.join(__dirname,'../','./lib/prod.js')
    }
    process.env.mode = mode?mode:(env=='dev'?'dev':'prod');
    spawn('node',[args[env]],{stdio: 'inherit',shell: true})
}