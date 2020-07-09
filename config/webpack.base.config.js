const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (options) => {
    const { cwd, mode, extraConfig } = options;
    let plugins = [
        new HtmlWebpackPlugin({
           template: path.join(cwd,'./index.html'),
           filename:'index.html'
        }),
        new webpack.DefinePlugin({
            ENV: JSON.stringify(mode),
        }),
    ];
    if(extraConfig.plugins){
        plugins = [...plugins,...extraConfig.plugins];
    }
    return  {
        entry: path.join(cwd,'./src/index.js'),
        output:{
            filename: 'index.js',
            path: path.join(cwd,'build'),
        },
        mode,
        devServer:{
            contentBase: path.join(cwd,'build'),
            open: true,
            hot: true,
        },
        module:{
            rules:[
                {
                    test:/\.css$/,
                    use:['style-loader',
                        {
                            loader: 'css-loader',
                        }
                    ]
                },
                {
                    test:/\.less$/,
                    use:[
                        'style-loader',
                        {
                            loader: 'css-loader',
                        },
                        'less-loader'
                    ]
                },
                {
                    test:/\.js$/,
                    use:[{
                        loader: 'babel-loader',
                    }]
                },
            ]
        },
        plugins,
    }
};
