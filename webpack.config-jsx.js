'use strict';

const path = require('path')
    , webpack = require('webpack')
    , HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  cache: true,
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
          ],
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
    new webpack.optimize.CommonsChunkPlugin({
      names: ['lib', 'manifest']
    }),
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
        inject: false
    })
  ]
};
