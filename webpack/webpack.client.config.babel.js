import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

module.exports = env => {
	const config = {
		entry: [
			'./src/index.js'
		],
		module: {
			loaders: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					loader: 'babel-loader'
				},
				{
					test: /\.s?css$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [
							{
								loader: 'css-loader',
								options: {
									modules: true,
									importLoaders: 1,
									localIdentName: '[name]__[local]___[hash:base64:5]'
								}
							},
							'postcss-loader',
							'sass-loader'
						]
					})
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

	if (env.prod) {
		config.plugins.push(
			new webpack.DefinePlugin({
				"process.env": {
					"NODE_ENV": JSON.stringify("production")
				}
			})
		);

		config.plugins.push(
			new UglifyJSPlugin({
				compress: {
					warnings: false
				}
			})
		);
	}

	return config;
};