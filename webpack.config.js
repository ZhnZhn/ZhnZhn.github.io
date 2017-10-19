'use strict';

const path = require('path')
    , webpack = require('webpack')
    , HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
     lib: [
            "react", "react-dom", "raven-js",            
            "reflux",
            "fetch-jsonp",
            "big.js", "interact.js", "localforage", "query-string",
            "lodash.merge", "lodash.flow",
            "dompurify",
            "highcharts", "highcharts/highcharts-more", "highcharts/modules/treemap",
            "highcharts/modules/exporting", "highcharts/modules/offline-exporting",
            "accounting",
            "jsonstat",
            "babel-runtime/helpers/classCallCheck",
            "babel-runtime/helpers/createClass",
            "babel-runtime/helpers/possibleConstructorReturn",
            "babel-runtime/helpers/inherits",
            "babel-runtime/helpers/toConsumableArray",
            "babel-runtime/helpers/slicedToArray"
          ],
    erc: path.resolve('js', 'index.js')
  },
  output: {
      path: path.resolve('app'),
      filename: "[name]_[chunkhash].js",
      chunkFilename: "[chunkhash].js"
  },
  resolve: {
    modules: ['local_modules', 'node_modules']
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
