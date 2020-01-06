const merge = require("webpack-merge");
const baseConfig = require("./base.config");
const devServer = require("./base.config").devServer;
module.exports = merge(baseConfig,{
    mode:"development",
    devtool: 'cheap-module-eval-source-map',
    plugins:[
        new webpack.HotModuleReplacementPlugin(),//热加载插件
        new webpack.NamedModulesPlugin(), // 作用是在热加载时直接返回更新文件名，而不是文件的id
        new webpack.NoEmitOnErrorsPlugin(),//跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
        new webpack.ProgressPlugin(),//进度提示
        new FriendlyErrorsPlugin({//友好的错误提示
            compilationSuccessInfo: {
              messages: [`Your application is running here: http://${devServer.host}:${devServer.port}`],
            }
          })
    ]
})
exports.devServer = devServer;