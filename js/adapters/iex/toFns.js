"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _ChartType = _interopRequireDefault(require("./ChartType"));

var _LOCALE = (navigator || {}).language;

var _isNumber = function _isNumber(n) {
  return typeof n === 'number';
};

var _calcScatterY = function _calcScatterY(chart, isMin) {
  var _chart$yAxis$ = chart.yAxis[0],
      max = _chart$yAxis$.max,
      min = _chart$yAxis$.min,
      all = max - min,
      one = all / 100;
  return isMin ? min + one : max - 7 * one;
};

var toFns = {
  toStr: function toStr(n) {
    return _isNumber(n) ? n.toLocaleString(_LOCALE) : '';
  },
  toPerc: function toPerc(n) {
    return _isNumber(n) ? n.toLocaleString(_LOCALE, {
      style: 'percent',
      minimumFractionDigits: 2
    }) : '';
  },
  crZhConfig: function crZhConfig(_ref) {
    var key = _ref.key,
        value = _ref.value,
        dataSource = _ref.dataSource;
    return {
      key: key,
      id: key,
      itemCaption: value || key,
      dataSource: dataSource
    };
  },
  crToSeria: function crToSeria(_ref2) {
    var chart = _ref2.chart,
        seria = _ref2.seria,
        caption = _ref2.caption,
        color = _ref2.color,
        option = _ref2.option;
    var dfType = option.dfType;
    var y = dfType === _ChartType["default"].ERN ? _calcScatterY(chart) : _calcScatterY(chart, true);
    seria.data.forEach(function (p) {
      return p.y = y;
    });
    Object.assign(seria, {
      zhItemCaption: caption,
      zhColor: color
    });
    return seria;
  }
};
var _default = toFns;
exports["default"] = _default;
//# sourceMappingURL=toFns.js.map