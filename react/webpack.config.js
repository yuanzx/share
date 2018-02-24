const path = require('path');
const ROOT_PATH = path.resolve(__dirname);
const APP_PATH = path.resolve(ROOT_PATH, 'src');
const BUILD_PATH = path.resolve(ROOT_PATH, 'build');
const HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        index: path.resolve(APP_PATH, 'index.jsx')
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
                loaders: [
                    'style-loader', 'css-loader', 'postcss-loader'
                ]
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }, {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loaders: [
                    'react-hot-loader', 'babel-loader'  //或者只使用'react-hot-loader/webpack'
                ],
                include: APP_PATH
            }
        ]
    },
    plugins: [new HtmlwebpackPlugin({title: 'My first react app'})]
}
