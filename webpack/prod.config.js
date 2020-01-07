const webpack = require("webpack")
const path = require("path")
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');//css压缩
const TerserPlugin = require('terser-webpack-plugin');//js压缩
const merge = require("webpack-merge")
const base = require("./base.config");
const utils = require("../lib/utils")
const ndpConfig = base.ndpConfig;
const devMode = process.env.NODE_ENV !== 'production'
let assetsPath = (dir)=>{return path.posix.join(utils.getAssetPath(ndpConfig,dir))}
let isAbsolute = path.isAbsolute(base.baseConfig.output.publicPath);
let cssPublicPath = '../'.repeat(ndpConfig.assetsDir?ndpConfig.assetsDir.split('/').length+1:1);
module.exports =merge(base.baseConfig,{
    mode:"production",
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[ 
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: isAbsolute?'/':cssPublicPath,
                        },
                    }, 
                    'css-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    optimization:{
        minimizer: [
          new TerserPlugin({}),
          new OptimizeCssAssetsPlugin({})
        ]
    },
    plugins:[
        new webpack.DefinePlugin({
            BASE_URL:JSON.stringify('./')
        }),
        new MiniCssExtractPlugin({
            filename: devMode ? assetsPath('css/[name].css') : assetsPath('css/[name].[contenthash].css'),
        })
    ]
})