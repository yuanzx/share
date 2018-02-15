var path = require('path')
var webpack = require('webpack')

module.exports = {
	entry: './src/js/abc/abc.index.js',
	output: {
		path: path.resolve(__dirname, './dist'),
		// publicPath: '/dist/',
		filename: "[name].[hash].js",
		hashDigestLength: 5

	},
	resolve: {
		// require时省略的扩展名，如：require('module') 不需要module.js
		extensions: ['', '.js', '.vue'],
		// 别名
		alias: {
			// components: path.join(__dirname, './src/js/components'),
			// libs: path.join(__dirname, './src/js/libs'),
			// modules: path.join(__dirname, './src/js/modules'),
			// verder: path.join(__dirname, './src/js/verder')
		}
	},
	resolveLoader: {
		root: path.join(__dirname, 'node_modules')
	},
	// 处理不同后缀的文件
	module: {
		loaders: [{
				test: /\.vue$/,
				loader: 'vue'
        }, {
				test: /\.js$/,
				loader: 'babel',
				exclude: /node_modules/
        }, {
				test: /\.css$/,
				loader: 'vue-style-loader!css-loader'
        }
        // , {
		// 	test: /\.less$/,
		// 	loader: 'vue-style-loader!css-loader!less-loader'
        // }, {
		// 	test: /\.(png|jpg|gif|svg)$/,
		// 	loader: 'file',
		// 	query: {
		// 		name: '[name].[ext]?[hash]'
		// 	}
        // }
    ]
	},
	// webpack-dev-server配置
	devServer: {
		historyApiFallback: true,
		noInfo: true
	},
	// 开启source-map，webpack有多种source-map，在官网文档可以查到
	devtool: '#eval-source-map'
}

// 生产环境，运行npm run build则执行这里
// if (process.env.NODE_ENV === 'production') {
// 	module.exports.devtool = '#source-map'
// 	// http://vue-loader.vuejs.org/en/workflow/production.html
// 	module.exports.plugins = (module.exports.plugins || []).concat([
//         // 环境变量
//         new webpack.DefinePlugin({
// 			'process.env': {
// 				NODE_ENV: '"production"'
// 			}
// 		}),
//         // 压缩代码
//         new webpack.optimize.UglifyJsPlugin({
// 			compress: {
// 				warnings: false
// 			}
// 		})
//     ])
// }
