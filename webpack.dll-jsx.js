'use strict'

const path = require('path')
    , webpack = require('webpack')
    , HtmlWebpackPlugin = require('html-webpack-plugin')
    , postProcessing = require('./plugins/post-processing')
    , HtmlProcessingWebpackPlugin = require('./plugins/html-processing-webpack-plugin')
    , babelConfig = require('./babel.config')
    , TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: "production",
  cache: true,
  entry: {
    erc: path.resolve('src', 'index.jsx')
  },
  output: {
      path: path.resolve('app'),
      filename: "[name]_[contenthash].js",
      chunkFilename: "[name]_[contenthash].js",
      publicPath: 'app/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
             cacheDirectory: true,
             ...babelConfig  
          }
        },
        include: [
          path.join(__dirname),
          path.join(__dirname, "src"),
        ]
      }
    ]
  },
  resolve: {
    modules: ['local_modules','node_modules'],
    extensions: ['.js', '.jsx']
  },
  plugins : [    
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./dll/lib-manifest.json')
    }),    
    new HtmlWebpackPlugin({
        filename: path.resolve('index.html'),
        template: path.resolve('template', 'index.ejs'),
        inject: false,
        postProcessing: postProcessing
    }),
    new HtmlProcessingWebpackPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
}
