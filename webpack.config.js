const webpack = require('webpack');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const isProduction = process.env.NODE_ENV === 'production';
const productionPluginDefine = isProduction ? [
	new webpack.IgnorePlugin(/\.(css|less|scss)$/),
	new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}})
] : [
	new webpack.IgnorePlugin(/\.(css|less|scss)$/),
	new CleanWebpackPlugin(['dist', 'build'], {
		root: __dirname,
		verbose: true,
		dry: false,
		exclude: []
	})
];

module.exports = [
	{
		entry: [
			'./src/index.js'
		],
		module: {
			loaders: [
				{
					test: /\.js?$/,
					enforce: "pre",
					loader: 'eslint-loader',
					options: {
						failOnWarning: false,
						failOnError: true
					},
					exclude: /node_modules/
				},
				{
					test: /\.js?$/,
					loader: 'babel-loader',
					exclude: /node_modules/
				}
			]
		},
		resolve: {
			extensions: ['.js']
		},
		output: {
			path: path.join(__dirname, '/dist'),
			publicPath: '/',
			filename: 'bundle.js'
		},
		devServer: {
			contentBase: './dist',
			hot: true
		},
		devtool: 'source-map',
		plugins: [
			new webpack.optimize.OccurrenceOrderPlugin(),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoErrorsPlugin()
		]
	},
	{
		entry: [
			'./src/assets/stylesheets/base.scss'
		],
		module: {
			rules: [{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					//resolve-url-loader may be chained before sass-loader if necessary
					use: ['css-loader', 'sass-loader']
				})
			}]
		},
		resolve: {
			extensions: ['.scss']
		},
		output: {
			path: path.join(__dirname, '/dist'),
			publicPath: '/',
			filename: 'style.bundle.css'
		},
		plugins: [
			new ExtractTextPlugin("style.bundle.css")
		]
	}];
