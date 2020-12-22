"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _ut = _interopRequireDefault(require("../../utils/ut"));

var getC = _ut["default"].getC,
    getV = _ut["default"].getV;
var _isArr = Array.isArray;

var _crC = function _crC(title, subtitle) {
  return {
    title: title,
    subtitle: subtitle
  };
};

var _crItemCaption = function _crItemCaption(items, titles) {
  if (!_isArr(titles) || titles.length === 0) {
    titles = [0];
  }

  return titles.map(function (titleIndex) {
    return getC(items[titleIndex]);
  }).join(': ');
};

var createrFns = {
  getC: getC,
  getV: getV,
  crItemKey: function crItemKey(items) {
    var _prefix = items.filter(Boolean).map(function (item) {
      return getV(item) || getC(item) || item;
    }).join('_');

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return [_prefix].concat(args).filter(Boolean).join('_');
  },
  crCaption: function crCaption(items, titles) {
    var itemCaption = _crItemCaption(items, titles),
        oneC = getC(items[0]),
        twoC = getC(items[1]),
        threeC = getC(items[2]),
        fourC = getC(items[3]);

    var _caption = _crC(oneC);

    if (fourC) {
      _caption = _crC(oneC + ": " + twoC, threeC + ": " + fourC);
    } else if (threeC) {
      _caption = _crC(oneC, twoC + ": " + threeC);
    } else if (twoC) {
      _caption = _crC(oneC, twoC);
    }

    return (0, _extends2["default"])({
      itemCaption: itemCaption,
      threeC: threeC
    }, _caption);
  },
  crAlertConf: function crAlertConf(alertItemId, alertGeo, alertMetric) {
    return {
      alertItemId: alertItemId,
      alertGeo: alertGeo,
      alertMetric: alertMetric
    };
  }
};
var _default = createrFns;
exports["default"] = _default;
//# sourceMappingURL=createrFns.js.map