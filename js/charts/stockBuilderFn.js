"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.fAddSplitRatio = exports.fAddMiniVolumes = exports.fAddMiniVolume = exports.fAddMiniHL = exports.fAddMiniATH = exports.fAddDividend = exports.crStockSeriaConfig = exports.crStockConfig = exports._fSetStockSerias = void 0;
var _pipe = _interopRequireDefault(require("../utils/pipe"));
var _Color = require("../constants/Color");
var _seriaFn = require("../math/seriaFn");
var _Chart = require("./Chart");
var _ChartConfigFn = require("./ChartConfigFn");
var _Tooltip = require("./Tooltip");
var _crMiniConfigFn = require("./crMiniConfigFn");
var _configBuilderFn = require("./configBuilderFn");
const _crScatterSeria = (color, pointFormatter, data) => ({
    type: 'scatter',
    color,
    data,
    tooltip: (0, _Chart.fTooltip)(pointFormatter)
  }),
  _crDividendSeria = data => _crScatterSeria(_Color.COLOR_EX_DIVIDEND, _Tooltip.tooltipExDividend, data),
  _crSplitRatioSeria = data => _crScatterSeria(_Color.COLOR_SPLIT_RATIO, _Tooltip.tooltipSplitRatio, data);
const _factoryAddMini = (propName, crMiniConfig) => option => config => (0, _configBuilderFn._addMini)(option[propName], option, crMiniConfig, config);
const fAddMiniVolume = exports.fAddMiniVolume = _factoryAddMini('data', _crMiniConfigFn.crMiniVolumeConfig);
const fAddMiniVolumes = arrOption => config => {
  arrOption.forEach(option => fAddMiniVolume(option)(config));
  return config;
};
exports.fAddMiniVolumes = fAddMiniVolumes;
const _fAddMiniNumberOfTrades = _factoryAddMini('data', _crMiniConfigFn.crMiniNumberOfTradesConfig);
const fAddMiniATH = exports.fAddMiniATH = _factoryAddMini('data', _crMiniConfigFn.crMiniATHConfig);
const fAddMiniHL = exports.fAddMiniHL = _factoryAddMini('data', _crMiniConfigFn.crMiniHLConfig);
const _factoryAddScatterBottom = (crSeria, seriaName) => (data, min, max) => config => (0, _configBuilderFn._fAddScatterBottom)(crSeria(data), seriaName, min, max)(config);
const fAddDividend = exports.fAddDividend = _factoryAddScatterBottom(_crDividendSeria, 'Dividend');
const fAddSplitRatio = exports.fAddSplitRatio = _factoryAddScatterBottom(_crSplitRatioSeria, 'Split Ratio');
const _crSeriaOption = (color, lineWidth) => ({
  type: 'line',
  visible: false,
  color,
  lineWidth,
  marker: {
    radius: 3,
    symbol: "circle"
  }
});
const _fSetStockSerias = (seriaType, lineWidth, dC, dH, dL, dO) => config => {
  const type = (0, _Chart.crType)(seriaType);
  (0, _ChartConfigFn.setSeriaDataTo)(config, dC, 0, 'Close', {
    type,
    lineWidth
  });
  (0, _ChartConfigFn.setSeriaDataTo)(config, dH, 1, 'High', _crSeriaOption(_Color.COLOR_S_HIGH, lineWidth));
  (0, _ChartConfigFn.setSeriaDataTo)(config, dL, 2, 'Low', _crSeriaOption(_Color.COLOR_S_LOW, lineWidth));
  (0, _ChartConfigFn.setSeriaDataTo)(config, dO, 3, 'Open', _crSeriaOption(_Color.COLOR_S_OPEN, lineWidth));
  return config;
};
exports._fSetStockSerias = _fSetStockSerias;
const crStockConfig = (id, option) => {
  const {
    isNotZoomToMinMax,
    isDrawDeltaExtrems,
    seriaType,
    seriaWidth,
    dC,
    dH,
    dL,
    dO,
    minClose,
    maxClose,
    dVc,
    dV,
    dATH,
    dN,
    dNc
  } = option;
  return (0, _pipe.default)((0, _configBuilderFn.crAreaConfig)(), (0, _configBuilderFn.fAddTooltip)(_Tooltip.tooltipValueTdmyIf), (0, _configBuilderFn.fAddMinMax)(dC, {
    minY: minClose,
    maxY: maxClose,
    isNotZoomToMinMax,
    isDrawDeltaExtrems
  }), _fAddMiniNumberOfTrades({
    id: "N of Trades",
    data: dN,
    dColumn: dNc
  }), fAddMiniVolume({
    id,
    data: dV,
    dColumn: dVc
  }), fAddMiniATH({
    id,
    data: dATH
  }), _fSetStockSerias(seriaType, seriaWidth, dC, dH, dL, dO));
};
exports.crStockConfig = crStockConfig;
const crStockSeriaConfig = (id, data) => (0, _ChartConfigFn.crSeriaConfig)({
  data,
  minY: (0, _seriaFn.findMinY)(data),
  zhValueText: id
});
exports.crStockSeriaConfig = crStockSeriaConfig;
//# sourceMappingURL=stockBuilderFn.js.map