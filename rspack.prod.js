"use strict"

const path = require("path")
, HtmlWebpackPlugin = require("html-webpack-plugin")
, babelConfig = require("./babel.config")
, { rspack } = require("@rspack/core");


module.exports = {
  mode: "production",
  cache: true,
  entry: {
    lib: [
      "react", "react-dom", "raven-js",                       
      "big.js",
      "localforage",                        
      "highcharts",                         
      "highcharts/modules/exporting", "highcharts/modules/offline-exporting"                                
    ],
    erc: {
      import: path.resolve("src", "index.jsx"),
      dependOn: "lib"
    }    
  },
  output: {
      path: path.resolve("app"),
      filename: "[name]_[chunkhash].js",
      chunkFilename: "[name]_[chunkhash].js",
      publicPath: "app/"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
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
    modules: ["node_modules"],
    extensions: [".js", ".jsx"]    
  },
  plugins : [    
    new HtmlWebpackPlugin({
      minify: false,
      filename: path.resolve("index.html"),
      template: path.resolve("template", "index-rspack.ejs"),
      inject: false
    })
  ],
  optimization: {        
    runtimeChunk: "single",
    minimize: true,    
    minimizer: [
       new rspack.SwcJsMinimizerRspackPlugin()
    ]
  },
  stats: {    
    colors: true
  }
}
