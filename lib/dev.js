const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');

module.exports = (config, port, contentBase) => {
   let compiler = webpack(config);
   const devServer = new WebpackDevServer(compiler, {
       contentBase,
       open: true,
       hot: true,
   });
   // Launch WebpackDevServer.
   devServer.listen(port, 'localhost', err => {
       if (err) {
           return console.log(err);
       }
   });
}