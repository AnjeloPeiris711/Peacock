const path =require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    resolve: {
        fallback: {
            "fs": false,
            "tls": false,
            "net": false,
            "path": false,
            "util":false,
            "assert": false,
            "buffer": false,
            "stream": false,
            "crypto": false,
            "http": false,
            "zlib": false,
            "https": false,
            "dns":false,
            "readline":false,
            "child_process":false
        }
    },
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './src/index.html'
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use:["style-loader","css-loader"]
            },
            {
                test: /\.(png|svg|jpe?g|gif)$/,
                include: /images/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'images/',
                            publicPath: 'images/'
                        }
                    }
                    ]
            },
            {
                test: /\.exe$/i,
                use: 'raw-loader',
            },
        ]
    }
}