'use strict'

const path = require('path')
    //, fs = require('fs')
    , webpack = require('webpack')
    , HtmlWebpackPlugin = require('html-webpack-plugin')
    , HtmlWebpackProcessingPlugin = require('html-webpack-processing-plugin')
    , postProcessing = require('./plugins/post-processing');


module.exports = {
  cache: true,
  entry: {
    erc: path.resolve('src', 'index.jsx')
  },
  output: {
      path: path.resolve('app'),
      filename: "[name]_[chunkhash].js",
      chunkFilename: "[name]_[chunkhash].js",
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
            "cacheDirectory": true,
            "plugins" : [
                          "transform-decorators-legacy",
                         [ "transform-react-remove-prop-types", {
                             "mode": "wrap",
                             "ignoreFilenames":["node_modules"]
                         }],
                         [ "transform-runtime", {
                             "helpers": true,
                             "polyfill": false,
                             "regenerator": false,
                             "moduleName": "babel-runtime"
                         }]
            ],
            presets: [
                      'env',
                      ['es2015', {modules: false}],
                      'react',
                      'stage-2'
            ]
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
    new webpack.DefinePlugin({
       'process.env' : {
          'NODE_ENV': JSON.stringify('production')
       }
    }),
    new webpack.DllReferencePlugin({
      context: '.',
      manifest: require('./dll/lib-manifest.json')
    }),
    /*
    new webpack.optimize.CommonsChunkPlugin({
      names: ['lib', 'manifest']
    }),
    */

    new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
           warnings: false
        },
        output: {
           comments: false
        }
    }),
    new HtmlWebpackPlugin({
        filename: path.resolve('index.html'),
        template: path.resolve('template', 'index.ejs'),
        inject: false,
        postProcessing: postProcessing
    }),
    new HtmlWebpackProcessingPlugin()
  ]
}
