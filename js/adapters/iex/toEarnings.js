'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _ChartConfig = require('../../charts/ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

var _Tooltip = require('../../charts/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _ConfigBuilder = require('../../charts/ConfigBuilder');

var _ConfigBuilder2 = _interopRequireDefault(_ConfigBuilder);

var _AdapterFn = require('../AdapterFn');

var _AdapterFn2 = _interopRequireDefault(_AdapterFn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C = {
  CAPTION: '4Q EPS',
  COLOR: '#4caf50',
  COLOR_PLUS: '#4caf50',
  COLOR_MINUS: '#f44336'
};

var _crZhConfig = function _crZhConfig(option) {
  var dataSource = option.dataSource,
      id = _AdapterFn2.default.crId();

  return {
    id: id, key: id,
    isWithoutAdd: true,
    isWithLegend: false,
    dataSource: dataSource
  };
};

var _calcScatterY = function _calcScatterY(chart) {
  var _chart$yAxis$ = chart.yAxis[0],
      max = _chart$yAxis$.max,
      min = _chart$yAxis$.min,
      all = max - min,
      one = all / 100;

  return max - 7 * one;
};

var _crSeria = function _crSeria(json, option) {
  var dfType = option.dfType,
      data = [];


  json[dfType].map(function (p) {
    var EPSReportDate = p.EPSReportDate,
        actualEPS = p.actualEPS,
        EPSSurpriseDollar = p.EPSSurpriseDollar,
        _c = EPSSurpriseDollar < 0 ? C.COLOR_MINUS : C.COLOR_PLUS,
        _p = _ChartConfig2.default.fMarkerExDividend(_c);

    _p.dataLabels.y = 0;
    data.push(Object.assign(_p, (0, _extends3.default)({
      x: _AdapterFn2.default.ymdToUTC(EPSReportDate),
      exValue: actualEPS
    }, p)));
  });
  return {
    type: 'scatter',
    tooltip: {
      pointFormatter: _Tooltip2.default.eps,
      headerFormat: ''
    },
    data: data
    //zhSeriaId : zhSeriaId
  };
};

var toEarnings = {
  toConfig: function toConfig(json, option) {
    var seria = _crSeria(json, option),
        config = (0, _ConfigBuilder2.default)().initBaseArea().add({
      zhConfig: _crZhConfig(option)
    }).toConfig();

    config.series[0] = seria;
    return config;
  },
  toSeries: function toSeries(json, option, chart) {
    var seria = _crSeria(json, option),
        y = _calcScatterY(chart);

    seria.data.forEach(function (p) {
      return p.y = y;
    });
    Object.assign(seria, {
      zhItemCaption: C.CAPTION,
      zhColor: C.COLOR
    });

    return seria;
  }
};

exports.default = toEarnings;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\adapters\iex\toEarnings.js.map