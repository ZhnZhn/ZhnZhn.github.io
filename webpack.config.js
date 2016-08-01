'use strict';

const path = require('path')
    , webpack = require('webpack')
    , HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
     erc: path.resolve('js', 'index.js'),
     lib: [
            "react", "react-dom", 
            "react-addons-shallow-compare", "react-addons-css-transition-group",
            "reflux",
            "big.js", "interact.js", "localforage",
            "lodash/sortBy", "lodash/merge", "lodash/flow",
            "purify",
            "highcharts", "highcharts/lib/highcharts-more", "highcharts/lib/modules/treemap",
            "highcharts/lib/modules/exporting", "highcharts/lib/modules/offline-exporting"
          ]
  },
  output: {
      path: path.resolve('app'),
      filename: "[name]_[chunkhash].js",
      chunkFilename: "[chunkhash].js"
  },
  resolve: {
    modulesDirectories: ['node_modules', 'local_modules']
  },
  plugins : [
    new webpack.DefinePlugin({
       'process.env' : {
          'NODE_ENV': JSON.stringify('production')
       }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'lib'
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
        inject: 'body'
    })
  ]
};
