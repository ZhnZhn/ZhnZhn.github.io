"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _Type = require("../../constants/Type");

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _Tooltip = _interopRequireDefault(require("../../charts/Tooltip"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _AdapterFn = _interopRequireDefault(require("../AdapterFn"));

var C = {
  COLOR_PLUS: '#4caf50',
  COLOR_MINUS: '#f44336'
};

var _crZhConfig = function _crZhConfig(option) {
  var dataSource = option.dataSource,
      id = _AdapterFn["default"].crId();

  return {
    id: id,
    key: id,
    isWithoutAdd: true,
    isWithLegend: false,
    dataSource: dataSource
  };
};

var _calcScatterY = function _calcScatterY(option, chart) {
  var _option$seriaType = option.seriaType,
      seriaType = _option$seriaType === void 0 ? _Type.ChartType.SCATTER_UP : _option$seriaType,
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
      seriaType = _option$seriaType2 === void 0 ? _Type.ChartType.SCATTER_UP : _option$seriaType2;
  var data = arr.map(function (p) {
    var date = p[0],
        v = p[1],
        _color = v >= 0 ? C.COLOR_PLUS : C.COLOR_MINUS,
        _p = _ChartConfig["default"].crMarkerExDividend(_color);

    _updateLabelY(_p, seriaType);

    return Object.assign(_p, (0, _extends2["default"])({
      x: _AdapterFn["default"].ymdToUTC(date),
      exValue: v
    }, p));
  });
  return {
    type: 'scatter',
    tooltip: {
      pointFormatter: _Tooltip["default"].exValue,
      headerFormat: ''
    },
    data: data //zhSeriaId : zhSeriaId

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
        config = (0, _ConfigBuilder["default"])().areaConfig().add({
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
var _default = ToScatter;
exports["default"] = _default;
//# sourceMappingURL=ToScatter.js.map