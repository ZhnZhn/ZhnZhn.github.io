"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _fnAdapter = _interopRequireDefault(require("./fnAdapter"));

var _conf = _interopRequireDefault(require("./conf"));

var fnLegend = {
  fItemWithRatio: function fItemWithRatio(hm, sum) {
    return function (item) {
      var name = item.name,
          _points = hm[name],
          _p = _points[_points.length - 1],
          _ratio = _p ? ' ' + _fnAdapter["default"].roundBy(_p.y / sum * 100, 1) + '%' : '';

      return (0, _extends2["default"])({}, item, {
        name: name + _ratio
      });
    };
  },
  calcRecentSum: function calcRecentSum(hm) {
    var key,
        sum = 0;

    for (key in hm) {
      if (key.indexOf(', nes') === -1 && key.indexOf(_conf["default"].WORLD) === -1) {
        var points = hm[key];
        sum += points[points.length - 1].y;
      }
    }

    return sum;
  },
  toAllLegend: function toAllLegend(arr, hm, measure) {
    var sum = fnLegend.calcRecentSum(hm),
        crItemWithRatio = fnLegend.fItemWithRatio(hm, sum);
    return sum !== 0 && measure !== _conf["default"].AVG_PRICE ? arr.map(crItemWithRatio) : arr;
  },
  toWorldLegend: function toWorldLegend(arr, hm) {
    var world = hm[_conf["default"].WORLD],
        sum = world ? world[world.length - 1].y : fnLegend.calcRecentSum(hm),
        crItemWithRatio = fnLegend.fItemWithRatio(hm, sum);
    return sum !== 0 && sum != null ? arr.map(crItemWithRatio) : arr;
  }
};
var _default = fnLegend;
exports["default"] = _default;
//# sourceMappingURL=fnLegend.js.map