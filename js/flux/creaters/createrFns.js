"use strict";

exports.__esModule = true;
exports.isFn = exports.getV = exports.getC = exports.crRoundTo = exports.crItemKey = exports.crCaptions = void 0;
var _arrFn = require("../../utils/arrFn");
var _getPropertyFn = require("../../utils/getPropertyFn");
var _toUpperCaseFirst = require("../../utils/toUpperCaseFirst");
const getC = exports.getC = _getPropertyFn.getC;
const getV = exports.getV = _getPropertyFn.getV;
const isFn = fn => typeof fn === 'function';
exports.isFn = isFn;
const _getC = item => (0, _toUpperCaseFirst.toUpperCaseFirst)(item && item.sc || getC(item));
const _isArr = Array.isArray;
const _joinByColon = arrStr => (0, _arrFn.joinBy)(": ", ...arrStr);
const _crItemCaption = (items, titles) => {
  if (!_isArr(titles) || titles.length === 0) {
    titles = [0];
  }
  return _joinByColon(titles.map(titleIndex => _getC(items[titleIndex])));
};
const _crCaptionItems = items => (items || []).map(item => _getC(item));
const crItemKey = function (items) {
  const _prefix = items.filter(Boolean).map(item => getV(item) || getC(item) || item).join('_');
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return (0, _arrFn.joinBy)("_", _prefix, ...args);
};

//[itemCaption, title, subtitle, threeC]
exports.crItemKey = crItemKey;
const crCaptions = (items, titles) => {
  const itemCaption = _crItemCaption(items, titles),
    _items = items.filter(getC),
    [item1, item2, item3, item4, ...restItems] = _items,
    oneC = _getC(item1),
    twoC = _getC(item2),
    threeC = _getC(item3),
    fourC = _getC(item4);
  let _title = oneC,
    _subtitle;
  if (fourC) {
    _title = _joinByColon([oneC, twoC]);
    _subtitle = _joinByColon([threeC, fourC, ..._crCaptionItems(restItems)]);
  } else if (threeC) {
    _subtitle = _joinByColon([twoC, threeC]);
  } else if (twoC) {
    _subtitle = twoC;
  }
  return [itemCaption, _title || _subtitle, _title ? _subtitle : void 0, threeC || twoC];
};
exports.crCaptions = crCaptions;
const crRoundTo = rt => {
  const _rt = parseInt(rt, 10);
  return _rt > -1 && _rt < 4 ? _rt : void 0;
};
exports.crRoundTo = crRoundTo;
//# sourceMappingURL=createrFns.js.map