"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Type = require("../../constants/Type");

var _ChartConfig = _interopRequireDefault(require("../../charts/ChartConfig"));

var _Tooltip = _interopRequireDefault(require("../../charts/Tooltip"));

var _ConfigBuilder = _interopRequireDefault(require("../../charts/ConfigBuilder"));

var _AdapterFn = require("../AdapterFn");

var _crFn = require("../crFn");

const C = {
  COLOR_PLUS: '#4caf50',
  COLOR_MINUS: '#f44336'
};

const _crZhConfig = option => {
  const {
    dataSource
  } = option,
        id = (0, _crFn.crId)();
  return {
    id,
    key: id,
    dataSource
  };
};

const _calcScatterY = (option, chart) => {
  const {
    seriaType = _Type.ChartType.SCATTER_UP
  } = option,
        {
    max,
    min
  } = chart.yAxis[0],
        onePercent = (max - min) / 100;
  return seriaType === _Type.ChartType.SCATTER_DOWN ? min + 4 * onePercent : max - 7 * onePercent;
};

const _updateLabelY = (p, seriaType) => {
  if (seriaType === _Type.ChartType.SCATTER_UP) {
    p.dataLabels.y = 0;
  }
};

const _crSeria = (arr, option) => {
  const {
    seriaType = _Type.ChartType.SCATTER_UP
  } = option;
  const data = arr.map(p => {
    const date = p[0],
          v = p[1],
          _color = v >= 0 ? C.COLOR_PLUS : C.COLOR_MINUS,
          _p = _ChartConfig.default.crMarkerExDividend(_color);

    _updateLabelY(_p, seriaType);

    return Object.assign(_p, {
      x: (0, _AdapterFn.ymdToUTC)(date),
      exValue: v,
      ...p
    });
  });
  return {
    type: 'scatter',
    tooltip: {
      pointFormatter: _Tooltip.default.exValue,
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

const toScatter = {
  toConfig: (data, option) => {
    const seria = _crSeria(data, option),
          config = (0, _ConfigBuilder.default)().areaConfig().add({
      zhConfig: _crZhConfig(option)
    }).toConfig();

    config.series[0] = seria;
    return config;
  },
  toSeria: (data, option, chart) => {
    const config = toScatter.toConfig(data, option),
          seria = _getSeriaFrom(config, option, chart);

    return seria;
  }
};
var _default = toScatter;
exports.default = _default;
//# sourceMappingURL=toScatter.js.map