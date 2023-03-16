"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.isFn = exports.getV = exports.getC = exports.crRoundTo = exports.crItemKey = exports.crCaption = exports.crAlertConf = void 0;
var _getPropertyFn = require("../../utils/getPropertyFn");
var _toUpperCaseFirst = _interopRequireDefault(require("../../utils/toUpperCaseFirst"));
const getC = _getPropertyFn.getC;
exports.getC = getC;
const getV = _getPropertyFn.getV;
exports.getV = getV;
const isFn = fn => typeof fn === 'function';
exports.isFn = isFn;
const _getC = item => (0, _toUpperCaseFirst.default)(item && item.sc || getC(item));
const _isArr = Array.isArray;
const _join = arr => arr.filter(Boolean).join(': ');
const _crC = (title, subtitle) => ({
  title: title || subtitle,
  subtitle: title ? subtitle : void 0
});
const _crItemCaption = (items, titles) => {
  if (!_isArr(titles) || titles.length === 0) {
    titles = [0];
  }
  return titles.map(titleIndex => _getC(items[titleIndex])).join(': ');
};
const _crCaptionItems = items => (items || []).map(item => _getC(item));
const crItemKey = function (items) {
  const _prefix = items.filter(Boolean).map(item => getV(item) || getC(item) || item).join('_');
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return [_prefix, ...args].filter(Boolean).join('_');
};
exports.crItemKey = crItemKey;
const crCaption = (items, titles) => {
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
    _title = _join([oneC, twoC]);
    _subtitle = _join([threeC, fourC, ..._crCaptionItems(restItems)]);
  } else if (threeC) {
    _subtitle = _join([twoC, threeC]);
  } else if (twoC) {
    _subtitle = twoC;
  }
  return {
    itemCaption,
    threeC,
    ..._crC(_title, _subtitle)
  };
};
exports.crCaption = crCaption;
const crRoundTo = rt => {
  const _rt = parseInt(rt, 10);
  return _rt > -1 && _rt < 4 ? _rt : void 0;
};
exports.crRoundTo = crRoundTo;
const crAlertConf = (alertItemId, alertGeo, alertMetric) => ({
  alertItemId,
  alertGeo,
  alertMetric
});
exports.crAlertConf = crAlertConf;
//# sourceMappingURL=createrFns.js.map