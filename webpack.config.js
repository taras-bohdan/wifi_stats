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
		entry: './server.js',
		output: {
			path: path.join(__dirname, 'dist'),
			filename: 'server.js',
			libraryTarget: 'commonjs2',
			publicPath: '/'
		},
		target: 'node',
		node: {
			console: false,
			global: false,
			process: false,
			Buffer: false,
			__filename: false,
			__dirname: false
		},
		externals: nodeExternals(),
		plugins: productionPluginDefine,
		module: {
			loaders: [
				{
					test: /\.js$/,
					loader: 'babel-loader'
				}
			].concat([
				{test: /\.json$/, loader: 'json-loader'},
				// {test: /\.s?css$/, loader: 'style!css!sass'}
			])
		}
	},
	{
		entry: [
			'./src/index.js'
		],
		module: {
			loaders: [
				{test: /\.js?$/, loader: 'babel-loader', exclude: /node_modules/}
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
					fallback: "style-loader",
					use: "css-loader"
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
