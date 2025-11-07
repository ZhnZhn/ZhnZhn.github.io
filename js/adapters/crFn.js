"use strict";

exports.__esModule = true;
exports.fCrItemLinkByUrl = exports.fCrItemLinkByCaption = exports.crValueConf = exports.crItemConf = exports.crId = void 0;
var _mathFn = require("../math/mathFn");
var _seriaHelperFn = require("../math/seriaHelperFn");
var _AdapterFn = require("./AdapterFn");
const _crPTag = className => className ? "<p class=\"" + className + "\">" : '<p>';

// Ndl toScatter, Stat-Json
const crId = () => (0, _mathFn.crId)().toUpperCase();
exports.crId = crId;
const _crItemLink = (caption, itemUrl, className) => _crPTag(className) + "<a href=\"" + itemUrl + "\">" + caption + "</a></p>";
const fCrItemLinkByCaption = caption => (0, _AdapterFn.bindTo)(_crItemLink, caption);
exports.fCrItemLinkByCaption = fCrItemLinkByCaption;
const fCrItemLinkByUrl = (caption, url) => (0, _AdapterFn.bindTo)(_crItemLink, caption, url);
exports.fCrItemLinkByUrl = fCrItemLinkByUrl;
const ITEM_CONF_PROP_NAMES = ['url', 'loadId', 'title', 'subtitle', 'itemCaption', 'seriaType', 'items'];
const crItemConf = option => ITEM_CONF_PROP_NAMES.reduce((itemConf, pn) => {
  const _value = option[pn];
  if (_value != null) {
    itemConf[pn] = (0, _AdapterFn.isArr)(_value) ? _value.map(obj => Object.assign({}, obj)) : _value;
  }
  return itemConf;
}, (0, _AdapterFn.crRouter)());
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