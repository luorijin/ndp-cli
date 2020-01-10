module.exports = {
    publicPath: './',
    devServer: {
        port:8081
    },
    // build时构建文件的目录 构建时传入
    outputDir: 'dist',

    // build时放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录
    assetsDir: 'static',

    // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
    indexPath: 'index.html',
    configureWebpack:{
        
    }
}