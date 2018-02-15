const Path = require('path');
const ROOT_PATH = Path.resolve(__dirname);
const APP_PATH = Path.resolve(ROOT_PATH, 'app');
const BUILD_PATH = Path.resolve(ROOT_PATH, 'build');
const HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: Path.resolve(APP_PATH, 'index.jsx')
    },
    output: {
        path: BUILD_PATH,
        filename: '[name].bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }, {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loaders: [
                    'react-hot-loader', 'babel-loader?presets[]=es2015&presets[]=react'
                ],
                include: APP_PATH
            }, {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader?sourceMap'
            }, {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    plugins: [new HtmlwebpackPlugin({title: 'My first react app'})]
}
