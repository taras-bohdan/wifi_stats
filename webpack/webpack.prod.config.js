var config = require('./webpack.client.config.js');
var webpack = require('webpack');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');


config.plugins.push(
	new webpack.DefinePlugin({
		"process.env": {
			"NODE_ENV": JSON.stringify("production")
		}
	})
);

config.plugins.push(
	new UglifyJSPlugin({
		sourceMap: true,
		compress: {
			warnings: false
		}
	})
);

module.exports = config;
