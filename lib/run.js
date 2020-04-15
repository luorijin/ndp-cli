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
    if(env=="add"){
        let installArgs = ['install'].concat(process.argv.slice(3))
        spawn('npm',installArgs,{stdio: 'inherit',shell: true,cwd:path.join(__dirname,'../')})
        process.exit(1)
    }
    if(!args[env]) {
        spawn('ndp',['--help'],{stdio: 'inherit',shell: true})
        process.exit(1)
    }
    let spArgs = [args[env]].concat(process.argv.slice(3));
    process.env.mode = mode?mode:(env=='dev'?'dev':'prod');
    process.env.NODE_ENV = ((mode)=>{
        switch(mode){
            case 'dev':
                return 'development';
            case 'test':
                return 'test';
            case 'prod':
                return 'production';
            default:
                return 'development';       
        }
    })(process.env.mode)
    spawn('node',spArgs,{stdio: 'inherit',shell: true})
}