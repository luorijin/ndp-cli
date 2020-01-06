let path = require("path");
let fs = require("fs")
module.exports ={
    getBabelConfig(){
        let configcwd = path.join(process.cwd(),'babel.config.js');
        if(fs.existsSync(configcwd)){
            return require(configcwd)
        }else{
            return {}
        }
    },
    getNdpConfig(){
        let configcwd = path.join(process.cwd(),'ndp.config.js');
        if(fs.existsSync(configcwd)){
            return require(configcwd)
        }else{
            return {}
        }
    },
    getEntryAndTemp(){
        let entry = {
            app:path.join(process.cwd(),'src/main.js')
        }
        let htmlWebpack = {
            // 模板来源
            template: 'public/index.html',
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'app']
        }
        return {
            entry,
            htmlWebpack
        }
    }
}