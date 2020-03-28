const merge = require("webpack-merge")
const FriendlyErrorsPlugin = require("friendly-errors-webpack-plugin")
const chalk = require("chalk")
const webpack = require("webpack")
const base = require("./base.config")
const devServer = base.devServer;
module.exports = merge(base.baseConfig,{
    mode:"development",
    devtool: 'cheap-module-eval-source-map',
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[ 'vue-style-loader', 'css-loader']
            },
            {
                test: /\.scss$/,
                use: [
                  'vue-style-loader',
                  'css-loader',
                  'sass-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                  'vue-style-loader',
                  'css-loader',
                  'less-loader'
                ]
            }
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(),//热加载插件
        new webpack.NamedModulesPlugin(), // 作用是在热加载时直接返回更新文件名，而不是文件的id
        new webpack.NoEmitOnErrorsPlugin(),//跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
        new webpack.ProgressPlugin(),//进度提示
        new FriendlyErrorsPlugin({//友好的错误提示
            compilationSuccessInfo: {
              messages: [`Your application is running here: ${baseUrl}`],
            },
            onErrors:function (severity, errors) {
                errors.forEach((error)=>{
                    console.log("webpackError:\n"+chalk.red(error.webpackError))
                })
            }
          })
    ]
})
module.exports.devServer = devServer;