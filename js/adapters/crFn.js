"use strict";

exports.__esModule = true;
exports.fCrItemLinkByUrl = exports.crValueConf = exports.crItemConf = exports.crId = void 0;
var _isTypeFn = require("../utils/isTypeFn");
var _bindTo = require("../utils/bindTo");
var _crRouter = require("../utils/crRouter");
var _uiApi = require("../components/uiApi");
var _mathFn = require("../math/mathFn");
var _seriaHelperFn = require("../math/seriaHelperFn");
const _crPTag = className => className ? `<p class="${className}">` : '<p>';

// Ndl toScatter, Stat-Json
const crId = () => (0, _mathFn.crId)().toUpperCase();
exports.crId = crId;
const _crItemLink = (caption, itemUrl, className) => {
  const _href = (0, _uiApi.toHref)(itemUrl);
  return _href ? `${_crPTag(className)}<a target="_blank" rel="noopener" href="${_href}">${caption}</a></p>` : '';
};
const fCrItemLinkByUrl = (caption, url) => (0, _bindTo.bindTo)(_crItemLink, caption, url);
exports.fCrItemLinkByUrl = fCrItemLinkByUrl;
const ITEM_CONF_PROP_NAMES = ['url', 'loadId', 'title', 'subtitle', 'itemCaption', 'seriaType', 'items'];
const crItemConf = option => ITEM_CONF_PROP_NAMES.reduce((itemConf, pn) => {
  const _value = option[pn];
  if (_value != null) {
    itemConf[pn] = (0, _isTypeFn.isArr)(_value) ? _value.map(obj => ({
      ...obj
    })) : _value;
  }
  return itemConf;
}, (0, _crRouter.crRouter)());
exports.crItemConf = crItemConf;
const crValueConf = data => {
  const _p = data[data.length - 1];
  return {
    x: (0, _seriaHelperFn.getPointDate)(_p),
    y: (0, _seriaHelperFn.getPointValue)(_p)
  };
};
exports.crValueConf = crValueConf;
//# sourceMappingURL=crFn.js.map