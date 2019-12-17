"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var _ChartType = _interopRequireDefault(require("./ChartType"));

var _calcScatterY = function _calcScatterY(chart, isMin) {
  var _chart$yAxis$ = chart.yAxis[0],
      max = _chart$yAxis$.max,
      min = _chart$yAxis$.min,
      all = max - min,
      one = all / 100;
  return isMin ? min + one : max - 7 * one;
};

var toFns = {
  crZhConfig: function crZhConfig(option) {
    var value = option.value,
        dataSource = option.dataSource,
        id = _AdapterFn["default"].crId();

    return {
      id: id,
      key: id,
      itemCaption: value || id,
      isWithoutAdd: true,
      isWithLegend: false,
      dataSource: dataSource
    };
  },
  crToSeria: function crToSeria(_ref) {
    var chart = _ref.chart,
        seria = _ref.seria,
        caption = _ref.caption,
        color = _ref.color,
        option = _ref.option;
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