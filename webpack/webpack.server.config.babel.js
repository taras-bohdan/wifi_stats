import webpack from 'webpack';
import path from 'path';
import nodeExternals from 'webpack-node-externals';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

const serverConfig = env => {
	const config = {
		name: 'server',
		target: 'node',
		externals: [nodeExternals()],
		entry: [
			'./server.js'
		],
		node: {
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
		plugins: []
	};

	if (env.prod) {
		config.plugins.push(
			new UglifyJSPlugin({
				compress: {
					warnings: false
				}
			}),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production')
			})
		);
	}

	return config;
};


module.exports = serverConfig;