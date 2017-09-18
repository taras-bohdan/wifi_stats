const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports =
	{
		entry: [
			'./src/index.js'
		],
		module: {
			loaders: [
				{
					test: /\.js?$/,
					loader: 'babel-loader',
					exclude: /node_modules/
				},
				// Rules for Style Sheets
				{
					test: /\.(css|less|scss|sss)$/,
					rules: [
						// Convert CSS into JS module
						{
							issuer: {not: [/\.(css|less|scss|sss)$/]},
							use: 'isomorphic-style-loader',
						},

						// Process external/third-party styles
						{
							exclude: path.resolve(__dirname, './src'),
							loader: 'css-loader',
							options: {
								// sourceMap: isDebug,
								// minimize: !isDebug,
								discardComments: {removeAll: true},
							},
						},

						// Process internal/project styles (from src folder)
						{
							include: path.resolve(__dirname, './src'),
							loader: 'css-loader',
							options: {
								// CSS Loader https://github.com/webpack/css-loader
								importLoaders: 1,
								// sourceMap: isDebug,
								modules: true,
								// localIdentName: isDebug
								// 	? '[name]-[local]-[hash:base64:5]'
								// 	: '[hash:base64:5]',
								localIdentName: '[name]__[local]___[hash:base64:5]',
								// CSS Nano http://cssnano.co/options/
								// minimize: !isDebug,
								discardComments: {removeAll: true},
							},
						},

						// Apply PostCSS plugins including autoprefixer
						{
							loader: 'postcss-loader',
							options: {
								config: {
									path: './postcss.config.js',
								},
							},
						},

						// Compile Sass to CSS
						{
							test: /\.scss$/,
							loader: 'sass-loader',
						},
					],
				},
			]
		},
		resolve: {
			extensions: ['.js']
		},
		output: {
			path: path.join(__dirname, '../dist'),
			publicPath: '/',
			filename: 'bundle.js'
		},
		devServer: {
			contentBase: '../dist',
			hot: true
		},
		devtool: 'inline-source-map',
		plugins: [
			new webpack.optimize.OccurrenceOrderPlugin(),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoErrorsPlugin(),
			new ExtractTextPlugin('style.bundle.css'),
		]
	};