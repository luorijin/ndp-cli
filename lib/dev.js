const webpack = require("webpack");
const devConfig = require("../webpack/dev.config");
const WebpackDevServer = require('webpack-dev-server');
// console.log(devConfig)
WebpackDevServer.addDevServerEntrypoints(devConfig, devConfig.devServer);
let compiler=webpack(devConfig);
const server= new WebpackDevServer(compiler,devConfig.devServer);
server.listen(devConfig.devServer.port,  devConfig.devServer.host, () => {});