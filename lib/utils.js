const path = require("path")
const fs = require("fs")
const chalk = require("chalk")
const merge = require("webpack-merge");
const cwdUrl = (url)=>{return path.join(process.cwd(),url)}
module.exports ={
    getBabelConfig(){
        let configcwd =cwdUrl('babel.config.js');
        if(fs.existsSync(configcwd)){
            return require(configcwd)
        }else{
            return {}
        }
    },
    getNdpConfig(){
        let configcwd = cwdUrl('ndp.config.js');
        let ndpConfig;
        if(fs.existsSync(configcwd)){
            ndpConfig = require(configcwd);
        }else{
            ndpConfig =  {
                devServer:{}
            }
        }
        return ndpConfig;
    },
    getEntryAndTemp(){
        let pages = this.getNdpConfig().pages || {};
        let entrys = {},htmlWebpack=[];
        let baseHtmlWebpack = {
            template:cwdUrl('public/index.html'),
            filename:'index.html',
            chunks:['chunk-vendors', 'chunk-common']
        }
        let pageKeys = Object.keys(pages);
        if(pages&&pageKeys.length){
            pageKeys.forEach((key)=>{
                let page = pages[key];
                if(typeof(page)=="string"){
                    entrys[key] = cwdUrl(page);
                    htmlWebpack.push(merge(baseHtmlWebpack,{
                        filename:`${key}.html`,
                        chunks:[key]
                    }))
                }else{
                    entrys[key] = cwdUrl(page.entry);
                    htmlWebpack.push(merge(baseHtmlWebpack,{
                        template:cwdUrl(page.template),
                        filename:page.filename,
                        chunks:[key]
                    }))
                }
            })
        }else{
            entrys = {
                app:cwdUrl('src/main.js')
            }
            htmlWebpack.push(merge(baseHtmlWebpack,{
                chunks:['app']
            }))
        }
        return {
            entrys,
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