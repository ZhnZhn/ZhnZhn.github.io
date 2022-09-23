"use strict";

exports.__esModule = true;
exports.toDescr = void 0;

var _crFn = require("../crFn");

var _conf = require("./conf");

const _crWebsiteLink = _crFn.crItemLink.bind(null, "Website UN Comtrade Data", "https://comtrade.un.org/data/"),
      _crDescrText = _ref => {
  let {
    cmdDescE,
    qtDesc
  } = _ref;
  return [cmdDescE, qtDesc].filter(Boolean).join(', ') + '.';
};

const _crDescr = json => {
  const {
    dataset
  } = json,
        _firtsItem = dataset[0];

  if (_firtsItem) {
    for (let i = 0; i < dataset.length; i++) {
      const _item = dataset[i];

      if (_item.TradeQuantity) {
        return _crDescrText(_item);
      }
    }

    return _firtsItem.cmdDescE ? _crDescrText(_firtsItem) : _conf.DESCR_EMPTY;
  }

  return _conf.DESCR_EMPTY;
};

const toDescr = (json, option) => option.period ? option.subtitle + _crWebsiteLink() : _crDescr(json) + _crWebsiteLink();

exports.toDescr = toDescr;
//# sourceMappingURL=fnDescr.js.map