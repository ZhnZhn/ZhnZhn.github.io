const assert = require('assert');

/*
Transformed html-webpack-proccessing-plugin
that uses html-webpack-plugin's hooks
from webpack's 3 API to to webpack's 4 API

Regired webpack 4, html-webpack-plugin with options:
preProcessing or postProcessing or both.
*/

const PLUGIN_NAME = 'HtmlProcessingWebpackPlugin';
const OPTIONS_ERR = `The ${PLUGIN_NAME} does not accept any options`;

const BEFORE_HTML_PROCESSING = 'html-webpack-plugin-before-html-processing';
const AFTER_HTML_PROCESSING = 'html-webpack-plugin-after-html-processing';

const _isFn = fn => typeof fn === 'function';

const preProcessing = (htmlPluginData, cb) => {
    const { options={} } = htmlPluginData.plugin;
    if (_isFn(options.preProcessing)) {
      try {
        htmlPluginData.html = options.preProcessing(htmlPluginData.html);
        _isFn(cb) && cb(null, htmlPluginData);
      } catch(err) {
        _isFn(cb) && cb(err);
      }
    } else {
      _isFn(cb) && cb(null, htmlPluginData);
    }
};

const postProcessing = (htmlPluginData, cb) => {
    const { options={} } = htmlPluginData.plugin;
    if (_isFn(options.postProcessing)) {
      try {
        htmlPluginData.html = options.postProcessing(htmlPluginData.html);
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
        compilation.hooks
          .htmlWebpackPluginBeforeHtmlProcessing
          .tapAsync(BEFORE_HTML_PROCESSING, preProcessing)
    })

    compile.hooks.compilation.tap(PLUGIN_NAME, compilation => {
      compilation.hooks
        .htmlWebpackPluginAfterHtmlProcessing
        .tapAsync(AFTER_HTML_PROCESSING, postProcessing)
    })
  }
};

module.exports = HtmlProcessingWebpackPlugin;
