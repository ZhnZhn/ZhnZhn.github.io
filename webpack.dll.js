'use strict';

const path = require('path')
    , webpack = require('webpack')
    , WriteDllStatsPlugin = require('./plugins/write-dll-stats-plugin')
    , TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: "production",
  entry: {
     lib: [            
            "react", "react-dom", "raven-js",
            "reflux-core",
            "fetch-jsonp",
            "big.js", "interactjs", 
            "localforage", "query-string",            
            "dompurify",
            "highcharts", "highcharts/highcharts-more", "highcharts/modules/treemap",
            "highcharts/modules/exporting", "highcharts/modules/offline-exporting",            
            "jsonstat",
            "memoize-one"
          ]
  },
  output: {
      path: path.resolve('app'),
      filename: "[name]_[chunkhash].js",
      library: '[name]_vendor'
  },
  resolve: {
    modules: ['local_modules','node_modules']
  },
  plugins: [    
    
    new webpack.DllPlugin({
      path: path.join(__dirname, 'dll', '[name]-manifest.json'),
      name: '[name]_vendor'      
    }),       
    new WriteDllStatsPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()]
  }
}
