const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const CopyWebpackPlugin = require("copy-webpack-plugin")
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const address = require("address");
const portFinderSync = require("portfinder-sync");
const merge = require("webpack-merge")
const utils = require("../lib/utils")
let babelOptions = utils.getBabelConfig();
let getEntryAndTemp = utils.getEntryAndTemp()
let resolve = (dir)=>{return path.join(process.cwd(),dir)};
let client = path.join(__dirname,"..","node_modules/webpack-dev-server/client");
const devMode = process.env.NODE_ENV !== 'production'
let ndpConfig = utils.getNdpConfig();
let outputDir = resolve(ndpConfig.outputDir || 'dist');
let assetsPath = (dir)=>{return path.posix.join(utils.getAssetPath(ndpConfig,dir))}
module.exports.baseConfig = merge({
    context:path.join(__dirname,'../'),
    entry:getEntryAndTemp.entry,
    output:{
        path:outputDir,
        publicPath: ndpConfig.publicPath ||'/',
        filename: devMode ? assetsPath('js/[name].js') : assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: devMode ? assetsPath('js/[name].js') : assetsPath('js/[name].[chunkhash].js')
    },
    performance: {
        hints:false
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
        modules: [resolve("node_modules"),path.join(__dirname,'../','node_modules'),'node_modules']
    },
    resolveLoader:{
        alias: {},
        modules: [resolve("node_modules"),path.join(__dirname,'../','node_modules'), "node_modules"]
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    prettify: false,
                    transformAssetUrls: {
                        video: ['src', 'poster'],
                        source: 'src',
                        img: 'src',
                        image: 'xlink:href'
                      }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                include: [resolve('src'), client],
                options:{
                    cwd:path.join(__dirname,'../'),
                    ...babelOptions
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    esModule: false,
                    limit: 10000,
                    name:assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    esModule: false,
                    limit: 10000,
                    name: assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    esModule: false,
                    limit: 10000,
                    name: assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        ]
      },
    plugins:[
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            ...getEntryAndTemp.htmlWebpack
          }),
        new CopyWebpackPlugin([
            {
              from: resolve("public"),
              to: outputDir,
              ignore: ['.*']
            }
        ])
    ]  
},ndpConfig.configureWebpack || {})

module.exports.devServer = (()=>{
    let host = address.ip() || "localhost";
    let basePort = ndpConfig.devServer.port || '8080' // port to begin scanning at
    let devServer = {
        clientLogLevel: 'warning',
        contentBase:false,
        host: host,
        port:portFinderSync.getPort(basePort),
        hot: true,
        publicPath:"/",
        quiet: true,
        ...ndpConfig.devServer
    }
    return devServer;
})()

module.exports.ndpConfig = ndpConfig;
