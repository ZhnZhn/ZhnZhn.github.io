'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

var _ChartType = require('./ChartType');

var _ChartType2 = _interopRequireDefault(_ChartType);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
        id = _AdapterFn2.default.crId();

    return {
      id: id, key: id,
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

    var y = dfType === _ChartType2.default.ERN ? _calcScatterY(chart) : _calcScatterY(chart, true);
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

exports.default = toFns;
//# sourceMappingURL=toFns.js.map