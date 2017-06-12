const webpack = require('webpack');
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = [
	{
		entry: [
			'./src/index.js'
		],
		module: {
			loaders: [
				/*{
				 test: /\.js?$/,
				 enforce: "pre",
				 loader: 'eslint-loader',
				 options: {
				 failOnWarning: false,
				 failOnError: true
				 },
				 exclude: /node_modules/
				 },*/
				{
					test: /\.js?$/,
					loader: 'babel-loader',
					exclude: /node_modules/
				},
				{
					/*test: /\.css$/,
					 loader: ExtractTextPlugin.extract(
					 {
					 fallback: 'style-loader',
					 use: combineLoaders([{
					 loader: 'css-loader',
					 query: {
					 modules: true,
					 localIdentName: '[name]__[local]___[hash:base64:5]'
					 }
					 }, 'sass-loader'])
					 })*/
					test: /\.css$/,
					loader: ExtractTextPlugin.extract({
						fallback: "style-loader",
						use: "css-loader"
					})
				},
				{
					test: /\.scss$/,
					loader: ExtractTextPlugin.extract(
						{
							use: [{
								loader: "css-loader"
							}, {
								loader: "sass-loader"
							}],
							// use style-loader in development
							fallback: "style-loader"
						})
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
			new webpack.NoErrorsPlugin(),
			new ExtractTextPlugin('style.bundle.css'),
			new CleanWebpackPlugin(['dist', 'build'], {
				root: __dirname,
				verbose: true,
				dry: false,
				exclude: []
			})
		]
	}];
