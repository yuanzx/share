/* global require, module, process */
var path = require("path")
var config = require('../config')
var utils = require('./utils')
var entris = require('./entris')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

config.build.productionSourceMap = false

baseWebpackConfig = merge(baseWebpackConfig, {
	module: {
		rules: [{
			test: /\.css$/,
			loader: ExtractTextPlugin.extract(['css-loader', 'postcss-loader'])
        }, {
			test: /\.less/,
			loader: ExtractTextPlugin.extract(['css-loader', 'postcss-loader', 'less-loader'])
        }]
	},
	devtool: config.build.productionSourceMap ?
		'#source-map' :
		false,
	output: {
		path: config.build.assetsRoot,
		filename: utils.assetsPath('js/[name].[chunkhash:7].js'),
		chunkFilename: utils.assetsPath('js/[name].[chunkhash:7].js')
	},
	plugins: [
        new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
        new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks(module, count) {
				return (module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0)
			}
		}),
        new webpack.optimize.CommonsChunkPlugin({
			name: 'manifest',
			chunks: ['vendor']
		}),
        new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			}
		}),
        new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash:7].css')),
        new webpack.optimize.ModuleConcatenationPlugin(),
    ]
})

Object.keys(entris).forEach(function (entry) {
	baseWebpackConfig.plugins.push(new HtmlWebpackPlugin({
		chunks: ['manifest', 'vendor', entry],
		filename: entry + '.php',
		template: 'src/template/index.php',
		inject: true,
		minify: {
			removeComments: true,
			collapseWhitespace: true,
			removeAttributeQuotes: true
		},
		chunksSortMode(chunk1, chunk2) {
			var orders = ['manifest', 'vendor', entry];
			var order1 = orders.indexOf(chunk1.names[0]);
			var order2 = orders.indexOf(chunk2.names[0]);
			return order1 - order2;
		}
	}))
})

module.exports = baseWebpackConfig
