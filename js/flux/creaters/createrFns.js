"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _getC2 = _interopRequireDefault(require("../../utils/getC"));

var _getV = _interopRequireDefault(require("../../utils/getV"));

var _toUpperCaseFirst = _interopRequireDefault(require("../../utils/toUpperCaseFirst"));

const _getC = item => (0, _toUpperCaseFirst.default)(item && item.sc || (0, _getC2.default)(item));

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

const createrFns = {
  getC: _getC2.default,
  getV: _getV.default,
  crItemKey: function (items) {
    const _prefix = items.filter(Boolean).map(item => (0, _getV.default)(item) || (0, _getC2.default)(item) || item).join('_');

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return [_prefix, ...args].filter(Boolean).join('_');
  },
  crCaption: (items, titles) => {
    const itemCaption = _crItemCaption(items, titles),
          _items = items.filter(_getC2.default),
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
  },
  crAlertConf: (alertItemId, alertGeo, alertMetric) => ({
    alertItemId,
    alertGeo,
    alertMetric
  })
};
var _default = createrFns;
exports.default = _default;
//# sourceMappingURL=createrFns.js.map