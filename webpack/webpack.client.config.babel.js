import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
// import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import CompressionPlugin from 'compression-webpack-plugin';
import * as variables from './variables';

export default (env) => {
  const config = {
    entry: [
      './src/index.jsx',
    ],
    module: {
      rules: [
        {
          enforce: 'pre',
          test: variables.reScript,
          exclude: /node_modules/,
          use: {
            loader: 'eslint-loader',
          },
        },
        {
          test: variables.reScript,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
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
                  localIdentName: '[name]__[local]___[hash:base64:5]',
                },
              },
              'postcss-loader',
              'sass-loader',
            ],
          }),
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    output: {
      path: path.join(__dirname, '../dist'),
      publicPath: '/',
      filename: 'bundle.js',
    },
    devServer: {
      contentBase: '../dist',
      hot: true,
    },
    devtool: 'inline-source-map',
    plugins: [
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new ExtractTextPlugin('style.bundle.css'),
      // new BundleAnalyzerPlugin(),
    ],
  };

  if (env.prod) {
    config.plugins.push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }));

    config.plugins.push(new UglifyJSPlugin({
      uglifyOptions: {
        compress: {
          warnings: false,
          drop_console: true,
          drop_debugger: true,
        },
      },
    }));
  }

  config.plugins.push(new CompressionPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$|\.css$|\.html$/,
  }));

  return config;
};
