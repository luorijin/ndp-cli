const path = require("path")
const spawn = require('child_process').spawnSync
module.exports = function(env,mode){
    let args = {
        dev:path.join(__dirname,'./dev.js'),
        build:path.join(__dirname,'./prod.js'),
        install:path.join(__dirname,'./install.js'),
        update:path.join(__dirname,'./install.js'),
        init:path.join(__dirname,'./init.js'),
        update:path.join(__dirname,'./update.js'),
    }
    if(!args[env]) {
        spawn('ndp',['--help'],{stdio: 'inherit',shell: true})
        process.exit(1)
    }
    let spArgs = [args[env]].concat(process.argv.slice(3));
    process.env.mode = mode?mode:(env=='dev'?'dev':'prod');
    spawn('node',spArgs,{stdio: 'inherit',shell: true})
}