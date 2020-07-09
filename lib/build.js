const webpack = require('webpack');
const { green ,redBright} = require('chalk');

function build(config) {
    console.log('Creating an optimized production build...');
  
    let compiler = webpack(config);
    compiler.run((err, stats) => {
        if (err) {
          console.log(redBright(err));
        } else {
          console.log(green(stats));
        }
       
    });
}

module.exports = build;