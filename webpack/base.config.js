const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const address = require("address");
const portfinder = require('portfinder');
const merge = require("webpack-merge")
const utils = require("../lib/utils")
let babelOptions = utils.getBabelConfig();
let getEntryAndTemp = utils.entryAndTemp()
let resolve = (dir)=>{path.join(process.cwd(),dir)};
let client = path.join(__dirname,"..","node_modules/webpack-dev-server/client");
const devMode = process.env.NODE_ENV !== 'production'
let ndpConfig = utils.getNdpConfig();
module.exports = merge({
    context:path.join(__dirname,'../'),
    entry:getEntryAndTemp.entry,
    output:{
        path:resolve(ndpConfig.outputDir || 'dist'),
        publicPath: devMode
        ? '/'
        : ndpConfig.publicPath ||'/',
        filename: devMode ? 'js/[name].js' : 'js/[name].[chunkhash].js',
        chunkFilename: devMode ? 'js/[name].js' : 'js/[name].[chunkhash].js'
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                  name: `chunk-vendors`,
                  test: /[\\/]node_modules[\\/]/,
                  priority: -10,
                  chunks: 'initial'
                },
                common: {
                  name: `chunk-common`,
                  minChunks: 2,
                  priority: -20,
                  chunks: 'initial',
                  reuseExistingChunk: true
                }
            }
        }
    },
    resolve: {
        extensions: ['.js', '.vue'],
        alias: {
          '@': resolve("src"),
        },
        modules: [resolve("src"), "node_modules"]
    },
    resolveLoader:{
        alias: {},
        modules: [resolve("node_modules"), "node_modules"]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), client],
                options:{
                    cwd:__dirname,
                    ...babelOptions
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
      },
    plugins:[
        new HtmlWebpackPlugin({
            ...getEntryAndTemp.htmlWebpack
          }),
        new CopyWebpackPlugin([
            {
              from: resolve("public"),
              to: resolve(ndpConfig.outputDir || 'dist'),
              ignore: ['.*']
            }
        ])
    ]  
},ndpConfig.configureWebpack || {})

exports.devServer = new Promise((resolve,reject)=>{
    let host = address.ip || "localhost";
    let devServer = {
        clientLogLevel: 'warning',
        contentBase:false,
        host: host,
        hot: true,
        publicPath:"/",
        quiet: true,
        ...ndpConfig.devServer
    }
    portfinder.basePort = ndpConfig.devServer.port || '8080';
    portfinder.getPortPromise().then((port)=>{
        devServer.port = port;
        resolve(devServer)
    }).catch((err) => {
        reject(err)
    });
})