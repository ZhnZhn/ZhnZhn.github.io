"use strict";

exports.__esModule = true;
exports.fCrItemLinkByUrl = exports.fCrItemLinkByCaption = exports.crValueConf = exports.crItemConf = exports.crId = exports.crHm = void 0;
var _mathFn = require("../math/mathFn");
var _AdapterFn = require("./AdapterFn");
var _getterPointFn = require("./getterPointFn");
const {
    assign,
    create
  } = Object,
  _isArr = Array.isArray,
  _crPTag = className => className ? `<p class="${className}">` : '<p>';
const crHm = obj => assign(create(null), obj);

// Ndl toScatter, Stat-Json
exports.crHm = crHm;
const crId = () => (0, _mathFn.crId)().toUpperCase();
exports.crId = crId;
const _crItemLink = (caption, itemUrl, className) => `${_crPTag(className)}<a href="${itemUrl}">${caption}</a></p>`;
const fCrItemLinkByCaption = caption => (0, _AdapterFn.bindTo)(_crItemLink, caption);
exports.fCrItemLinkByCaption = fCrItemLinkByCaption;
const fCrItemLinkByUrl = (caption, url) => (0, _AdapterFn.bindTo)(_crItemLink, caption, url);
exports.fCrItemLinkByUrl = fCrItemLinkByUrl;
const ITEM_CONF_PROP_NAMES = ['url', 'loadId', 'title', 'subtitle', 'itemCaption', 'seriaType', 'items'];
const crItemConf = option => {
  const _itemConf = {};
  let _value;
  ITEM_CONF_PROP_NAMES.forEach(k => {
    _value = option[k];
    if (_value != null) {
      _itemConf[k] = _isArr(_value) ? _value.map(obj => ({
        ...obj
      })) : _value;
    }
  });
  return _itemConf;
};
exports.crItemConf = crItemConf;
const crValueConf = data => {
  const _p = data[data.length - 1];
  return {
    x: (0, _getterPointFn.getPointDate)(_p),
    y: (0, _getterPointFn.getPointValue)(_p)
  };
};
exports.crValueConf = crValueConf;
//# sourceMappingURL=crFn.js.map