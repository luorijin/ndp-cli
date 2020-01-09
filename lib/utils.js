const path = require("path")
const fs = require("fs")
const chalk = require("chalk") 
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
            return {
                devServer:{}
            }
        }
    },
    getEntryAndTemp(){
        let entry = {
            app:path.join(process.cwd(),'src/main.js')
        }
        let htmlWebpack = {
            // 模板来源
            template:path.join(process.cwd(),'public/index.html'),
            // 在 dist/index.html 的输出
            filename: 'index.html',
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'app']
        }
        return {
            entry,
            htmlWebpack
        }
    },
    getEnv(env){
        let url = path.join(process.cwd(),`config/${env}.env.js`);
        if(fs.existsSync(url)){
            return require(url);
        }else{
            console.log(chalk.yellow(`[${url}]路径不存在`));
            return {};
        }
    },
    getAssetPath(ndpConfig,filePath){//静态资源生成路径
        return ndpConfig.assetsDir
        ? path.posix.join(ndpConfig.assetsDir, filePath)
        : filePath
    }
}