'use strict';

const path = require('path')
    , webpack = require('webpack')
    , HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
     lib: [
            "react", "react-dom", "raven-js",
            "react-addons-shallow-compare", "react-addons-css-transition-group",
            "reflux",
            "big.js", "interact.js", "localforage",
            "lodash.sortby", "lodash.merge", "lodash.flow",
            "purify",
            "highcharts", "highcharts/lib/highcharts-more", "highcharts/lib/modules/treemap",
            "highcharts/lib/modules/exporting", "highcharts/lib/modules/offline-exporting",
            "accounting",
            "jsonstat"            
          ],
    erc: path.resolve('js', 'index.js')
  },
  output: {
      path: path.resolve('app'),
      filename: "[name]_[chunkhash].js",
      chunkFilename: "[chunkhash].js"
  },
  resolve: {
    modulesDirectories: ['local_modules', 'node_modules']
  },
  plugins : [
    new webpack.DefinePlugin({
       'process.env' : {
          'NODE_ENV': JSON.stringify('production')
       }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['lib', 'manifest']
    }),
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
        inject: false
    })
  ]
};
