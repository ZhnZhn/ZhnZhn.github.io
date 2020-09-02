const HtmlWebpackPlugin = require('html-webpack-plugin');
const assert = require('assert');

/*
Transformed html-webpack-proccessing-plugin
that uses html-webpack-plugin's hooks
from webpack's 3 API to to webpack's 4 API

Regired webpack 4, html-webpack-plugin 4, with options:
postProcessing.
*/

const PLUGIN_NAME = 'HtmlProcessingWebpackPlugin';
const OPTIONS_ERR = `The ${PLUGIN_NAME} does not accept any options`;

const BEFORE_EMIT = 'html-webpack-plugin-before-emit';

const _isFn = fn => typeof fn === 'function';


const _postProcessing = (htmlPluginData, cb) => {
    const { options } = htmlPluginData.plugin
    , { postProcessing } = options || {};
    if (_isFn(postProcessing)) {
      try {
        htmlPluginData.html = postProcessing(htmlPluginData.html);
        _isFn(cb) && cb(null, htmlPluginData);
      } catch(err) {
        _isFn(cb) && cb(err);
      }
    } else {
      _isFn(cb) && cb(null, htmlPluginData);
    }
};


class HtmlProcessingWebpackPlugin {
  constuctor(options){
    assert.equal(options, void 0, OPTIONS_ERR);
  }
  apply(compile){    
    compile.hooks.compilation.tap(PLUGIN_NAME, compilation => {
      HtmlWebpackPlugin
       .getHooks(compilation)
       .beforeEmit
       .tapAsync(BEFORE_EMIT, _postProcessing)      
    })
  }
};

module.exports = HtmlProcessingWebpackPlugin;
