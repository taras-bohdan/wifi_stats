var webpack = require('webpack');
var path = require('path');
var nodeExternals = require('webpack-node-externals');

var isProduction = process.env.NODE_ENV === 'production';
var productionPluginDefine = isProduction ? [
	new webpack.IgnorePlugin(/\.(css|less|scss)$/),
	new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('production')}})
] : [
	// new webpack.IgnorePlugin(/\.(css|less|scss)$/),
	new CleanWebpackPlugin(['dist', 'build'], {
		root: '/',
		verbose: true,
		dry: false,
		exclude: []
	})
];

module.exports = [
	{
		entry: './server.js',
		output: {
			path: './dist',
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
					loader: 'babel'
				}
			].concat([
				{test: /\.json$/, loader: 'json-loader'},
				{test: /\.s?css$/, loader: 'style!css!sass'}
			])
		}
	},
	{
		entry: [
			'./src/index.js'
		],
		module: {
			loaders: [
				{test: /\.js?$/, loader: 'babel', exclude: /node_modules/}
			]
		},
		resolve: {
			extensions: ['', '.js']
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
			new webpack.optimize.OccurenceOrderPlugin(),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NoErrorsPlugin()
		]
	},
	{
		entry: [
			'./src/assets/stylesheets/base.scss'
		],
		module: {
			loaders: [
				{test: /\.s?css$/, loader: 'style!css!sass'},
			]
		},
		resolve: {
			extensions: ['', '.scss']
		},
		output: {
			path: path.join(__dirname, '/dist'),
			publicPath: '/',
			filename: 'index.css'
		}
	}];
