"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _conf = _interopRequireDefault(require("./conf"));

var crItemLink = _AdapterFn["default"].crItemLink;

var _isArr = Array.isArray,
    _crWebsiteLink = crItemLink.bind(null, "Website UN Comtrade Data", "https://comtrade.un.org/data/", "padding-bottom: 8px;"),
    _crDatasetLink = crItemLink.bind(null, "UN Comtrade Dataset Link"),
    _crDescrText = function _crDescrText(_ref) {
  var cmdDescE = _ref.cmdDescE,
      qtDesc = _ref.qtDesc;
  return cmdDescE + ', ' + qtDesc + '.';
};

var _crDescr = function _crDescr(json) {
  var dataset = json.dataset,
      _firtsItem = dataset[0];

  if (_isArr(dataset) && _firtsItem) {
    var i = 0,
        max = dataset.length;

    for (; i < max; i++) {
      var _item = dataset[i];

      if (_item.TradeQuantity) {
        return _crDescrText(_item);
      }
    }

    return _firtsItem.cmdDescE ? _crDescrText(_firtsItem) : _conf["default"].DESCR_EMPTY;
  }

  return _conf["default"].DESCR_EMPTY;
};

var fnDescr = {
  toDescr: function toDescr(json, option) {
    return _crDescr(json) + _crWebsiteLink() + _crDatasetLink(option.nativeHref);
  }
};
var _default = fnDescr;
exports["default"] = _default;
//# sourceMappingURL=fnDescr.js.map