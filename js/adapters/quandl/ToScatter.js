'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _Type = require('../../constants/Type');

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

var _calcScatterY = function _calcScatterY(option, chart) {
  var _option$seriaType = option.seriaType,
      seriaType = _option$seriaType === undefined ? _Type.ChartType.SCATTER_UP : _option$seriaType,
      _chart$yAxis$ = chart.yAxis[0],
      max = _chart$yAxis$.max,
      min = _chart$yAxis$.min,
      onePercent = (max - min) / 100;

  switch (seriaType) {
    case _Type.ChartType.SCATTER_DOWN:
      return min + 4 * onePercent;
    default:
      return max - 7 * onePercent;
  }
};

var _updateLabelY = function _updateLabelY(p, seriaType) {
  if (seriaType === _Type.ChartType.SCATTER_UP) {
    p.dataLabels.y = 0;
  }
};

var _crSeria = function _crSeria(arr, option) {
  var _option$seriaType2 = option.seriaType,
      seriaType = _option$seriaType2 === undefined ? _Type.ChartType.SCATTER_UP : _option$seriaType2;

  var data = arr.map(function (p) {
    var date = p[0],
        v = p[1],
        _color = v >= 0 ? C.COLOR_PLUS : C.COLOR_MINUS,
        _p = _ChartConfig2.default.fMarkerExDividend(_color);

    _updateLabelY(_p, seriaType);
    return Object.assign(_p, (0, _extends3.default)({
      x: _AdapterFn2.default.ymdToUTC(date),
      exValue: v
    }, p));
  });
  return {
    type: 'scatter',
    tooltip: {
      pointFormatter: _Tooltip2.default.exValue,
      headerFormat: ''
    },
    data: data
    //zhSeriaId : zhSeriaId
  };
};

var _getSeriaFrom = function _getSeriaFrom(config, option, chart) {
  var y = _calcScatterY(option, chart),
      seria = config.series[0],
      _d = seria.data.map(function (p) {
    p.y = y;
    return p;
  });
  seria.data = _d;
  return seria;
};

var ToScatter = {

  toConfig: function toConfig(data, option) {
    var seria = _crSeria(data, option),
        config = (0, _ConfigBuilder2.default)().initBaseArea().add({
      zhConfig: _crZhConfig(option)
    }).toConfig();
    config.series[0] = seria;
    return config;
  },

  toSeria: function toSeria(data, option, chart) {
    var config = ToScatter.toConfig(data, option),
        seria = _getSeriaFrom(config, option, chart);
    return seria;
  }

};

exports.default = ToScatter;
//# sourceMappingURL=ToScatter.js.map