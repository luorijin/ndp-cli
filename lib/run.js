const webpack = require("webpack");
const spawn = require('child_process').spawnSync
module.exports = function(arg){
    let dir = path.join(__dirname,'../');
    let args = {
        dev:'./lib/dev.js',
        prod:'./lib/prod.js'
    }
    spawn('node',[args[arg]],{cwd:dir, stdio: 'inherit',shell: true})
}