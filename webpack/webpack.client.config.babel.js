import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
// import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer';
import CompressionPlugin from 'compression-webpack-plugin';

export default (env) => {
  const config = {
    entry: [
      './src/index.jsx',
    ],
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.jsx$/,
          exclude: /node_modules/,
          loader: 'eslint-loader',
        },
        {
          test: /\.js(x)$/,
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
      // new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new ExtractTextPlugin('style.bundle.css'),
      // new BundleAnalyzerPlugin()
    ],
  };

  if (env.prod) {
    config.plugins.push(new UglifyJSPlugin({
      compress: {
        warnings: false,
      },
    }));

    config.plugins.push(new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }));

    config.plugins.push(new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js(x)$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }));
  }

  return config;
};
