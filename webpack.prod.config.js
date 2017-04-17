var config = require('./webpack.config.js');
var webpack = require('webpack');

config[1].plugins.push(//TODO replace [1]
	new webpack.DefinePlugin({
		"process.env": {
			"NODE_ENV": JSON.stringify("production")
		}
	})
);

config[1].plugins.push(//TODO fix properly
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false
		}
	})
);

module.exports = config;
