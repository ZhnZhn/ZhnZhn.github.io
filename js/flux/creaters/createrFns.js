"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _getCaption = function _getCaption(item) {
  return item && item.caption || '';
};

var _crC = function _crC(title, subtitle) {
  return {
    title: title,
    subtitle: subtitle
  };
};

var createrFns = {
  crItemKey: function crItemKey(items, seriaType, date) {
    var _prefix = items.filter(Boolean).map(function (item) {
      return item.value || item.caption || item;
    }).join('_');

    return [_prefix, seriaType || '', date || ''].join('_');
  },
  crCaption: function crCaption(items) {
    var oneC = _getCaption(items[0]),
        twoC = _getCaption(items[1]),
        threeC = _getCaption(items[2]),
        fourC = _getCaption(items[3]);

    var _caption = _crC(oneC);

    if (fourC) {
      _caption = _crC(oneC + ": " + twoC, threeC + ": " + fourC);
    } else if (threeC) {
      _caption = _crC(oneC, twoC + ": " + threeC);
    } else if (twoC) {
      _caption = _crC(oneC, twoC);
    }

    return (0, _extends2["default"])({
      oneC: oneC,
      twoC: twoC,
      threeC: threeC,
      fourC: fourC
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