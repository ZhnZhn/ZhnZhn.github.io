"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.toScatterSeria = exports.toScatterConfig = void 0;
var _ChartType = require("../../constants/ChartType");
var _MarkerFn = require("../../charts/MarkerFn");
var _Tooltip = require("../../charts/Tooltip");
var _pipe = _interopRequireDefault(require("../../utils/pipe"));
var _configBuilderFn = require("../../charts/configBuilderFn");
var _AdapterFn = require("../AdapterFn");
var _crFn = require("../crFn");
const COLOR_PLUS = '#4caf50',
  COLOR_MINUS = '#f44336',
  _assign = Object.assign;
const _crZhConfig = _ref => {
  let {
    dataSource
  } = _ref;
  const id = (0, _crFn.crId)();
  return {
    id,
    key: id,
    dataSource
  };
};
const _calcScatterY = (option, chart) => {
  const {
      seriaType = _ChartType.CHT_SCATTER_UP
    } = option,
    {
      max,
      min
    } = chart.yAxis[0],
    onePercent = (max - min) / 100;
  return seriaType === _ChartType.CHT_SCATTER_DOWN ? min + 4 * onePercent : max - 7 * onePercent;
};
const _updateLabelY = (p, seriaType) => {
  if (seriaType === _ChartType.CHT_SCATTER_UP) {
    p.dataLabels.y = 0;
  }
};
const _crSeria = (arr, option) => {
  const {
      seriaType = _ChartType.CHT_SCATTER_UP
    } = option,
    data = arr.map(p => {
      const date = p[0],
        v = p[1],
        _color = v >= 0 ? COLOR_PLUS : COLOR_MINUS,
        _p = (0, _MarkerFn.crMarkerExDividend)(_color);
      _updateLabelY(_p, seriaType);
      return _assign(_p, {
        x: (0, _AdapterFn.ymdToUTC)(date),
        exValue: v,
        ...p
      });
    });
  return {
    type: 'scatter',
    tooltip: {
      pointFormatter: _Tooltip.tooltipExValue,
      headerFormat: ''
    },
    data: data
  };
};
const _getSeriaFrom = (config, option, chart) => {
  const y = _calcScatterY(option, chart),
    seria = config.series[0],
    _d = seria.data.map(p => {
      p.y = y;
      return p;
    });
  seria.data = _d;
  return seria;
};
const toScatterConfig = (data, option) => (0, _pipe.default)((0, _configBuilderFn.crAreaDfConfig)(), (0, _configBuilderFn.fSetSeriaBy)(0, _crSeria(data, option)), (0, _configBuilderFn.fAdd)({
  zhConfig: _crZhConfig(option)
}), _configBuilderFn.toConfig);
exports.toScatterConfig = toScatterConfig;
const toScatterSeria = (data, option, chart) => _getSeriaFrom(toScatterConfig(data, option), option, chart);
exports.toScatterSeria = toScatterSeria;
//# sourceMappingURL=toScatter.js.map