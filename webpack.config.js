'use strict';
const webpack = require('webpack')
    , HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
     erc: "./js/index.js",
     lib: [ 
            "react", "react-dom", "react-addons-shallow-compare", "reflux",
            "big.js", "interact.js", "localforage",
            "lodash/sortBy", "lodash/merge", "lodash/flow", 
            "purify",
            "highcharts", "highcharts/lib/highcharts-more", "highcharts/lib/modules/treemap" 
          ]
  },
  output: {
      path: "./app",
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
        filename: '../index.html', 
        template: './template/index.ejs',
        inject: 'body' 
    })
  ]
};
