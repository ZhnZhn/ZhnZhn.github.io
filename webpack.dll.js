'use strict';

const path = require('path')
    , webpack = require('webpack')
    , WriteDllStats = require('./plugins/write-dll-stats');

module.exports = {
  entry: {
     lib: [
            "react", "react-dom", "raven-js",
            "reflux",
            "fetch-jsonp",
            "big.js", "interactjs", "localforage", "query-string",
            "lodash.merge",
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
          ]
  },
  output: {
      path: path.resolve('app'),
      filename: "[name]_[chunkhash].js",

      library: '[name]_vendor'
  },
  resolve: {
    //root: path.resolve(__dirname, "client"),
    modules: ['local_modules','node_modules']
    //extensions: ['.js', '.jsx']
  },
  plugins: [
    new webpack.DefinePlugin({
       'process.env' : {
          'NODE_ENV': JSON.stringify('production')
       }
    }),
    new webpack.DllPlugin({
      // The path to the manifest file which maps between
      // modules included in a bundle and the internal IDs
      // within that bundle
      path: 'dll/[name]-manifest.json',

      // The name of the global variable which the library's
      // require function has been assigned to. This must match the
      // output.library option above
      name: '[name]_vendor'

      //context: path.resolve(__dirname, "client")
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
           warnings: false
           //screw_ie8: true
        },
        output: {
           comments: false
        }
    }),
    new WriteDllStats()
  ]
}
