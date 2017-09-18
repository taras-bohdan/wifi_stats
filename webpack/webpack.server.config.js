const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');


const serverConfig = {
	name: 'server',
	target: 'node',
	externals: [nodeExternals()],
	entry: [
		'./server.js'
	],
	node:{
		__filename: false,
		__dirname: false,
	},
	output: {
		path: path.join(__dirname, '../dist/'),
		filename: 'server.js',
		libraryTarget: 'commonjs2'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				loader: 'null'
			},
			{
				test: /\.scss$/,
				loader: 'css-loader/locals?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
			}
		]
	},
	devtool: 'inline-source-map',
};

module.exports = serverConfig;