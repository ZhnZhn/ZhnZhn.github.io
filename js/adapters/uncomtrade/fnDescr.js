"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _crFn = require("../crFn");

var _conf = _interopRequireDefault(require("./conf"));

const _isArr = Array.isArray,
      _crWebsiteLink = _crFn.crItemLink.bind(null, "Website UN Comtrade Data", "https://comtrade.un.org/data/", "padding-bottom: 8px;"),
      _crDatasetLink = _crFn.crItemLink.bind(null, "UN Comtrade Dataset Link"),
      _crDescrText = _ref => {
  let {
    cmdDescE,
    qtDesc
  } = _ref;
  return cmdDescE + ', ' + qtDesc + '.';
};

const _crDescr = json => {
  const {
    dataset
  } = json,
        _firtsItem = dataset[0];

  if (_isArr(dataset) && _firtsItem) {
    let i = 0,
        max = dataset.length;

    for (; i < max; i++) {
      const _item = dataset[i];

      if (_item.TradeQuantity) {
        return _crDescrText(_item);
      }
    }

    return _firtsItem.cmdDescE ? _crDescrText(_firtsItem) : _conf.default.DESCR_EMPTY;
  }

  return _conf.default.DESCR_EMPTY;
};

const fnDescr = {
  toDescr: (json, option) => {
    return _crDescr(json) + _crWebsiteLink() + _crDatasetLink(option.nativeHref);
  }
};
var _default = fnDescr;
exports.default = _default;
//# sourceMappingURL=fnDescr.js.map