"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.fAddSplitRatio = exports.fAddMiniVolume = exports.fAddMiniATH = exports.fAddDividend = exports.crStockConfig = exports._fSetStockSerias = void 0;
var _pipe = _interopRequireDefault(require("../utils/pipe"));
var _Color = require("../constants/Color");
var _Chart = require("./Chart");
var _ChartConfigFn = require("./ChartConfigFn");
var _Tooltip = require("./Tooltip");
var _IndicatorConfigFn = require("./IndicatorConfigFn");
var _configBuilderFn = require("./configBuilderFn");
const _crScatterSeria = (color, pointFormatter, data) => ({
    type: 'scatter',
    color,
    data,
    tooltip: (0, _Chart.fTooltip)(pointFormatter)
  }),
  _crDividendSeria = data => _crScatterSeria(_Color.COLOR_EX_DIVIDEND, _Tooltip.tooltipExDividend, data),
  _crSplitRatioSeria = data => _crScatterSeria(_Color.COLOR_SPLIT_RATIO, _Tooltip.tooltipSplitRatio, data);
const fAddMiniVolume = option => config => (0, _configBuilderFn._addMini)(option.dVolume, option, _IndicatorConfigFn.crMiniVolumeConfig, config);
exports.fAddMiniVolume = fAddMiniVolume;
const fAddMiniATH = option => config => (0, _configBuilderFn._addMini)(option.data, option, _IndicatorConfigFn.crMiniATHConfig, config);
exports.fAddMiniATH = fAddMiniATH;
const fAddDividend = (data, min, max) => config => (0, _configBuilderFn._fAddScatterBottom)(_crDividendSeria(data), 'Dividend', min, max)(config);
exports.fAddDividend = fAddDividend;
const fAddSplitRatio = (data, min, max) => config => (0, _configBuilderFn._fAddScatterBottom)(_crSplitRatioSeria(data), 'Split Ratio', min, max)(config);
exports.fAddSplitRatio = fAddSplitRatio;
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
  const type = (0, _Chart.crType)(seriaType, 'area');
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
    dATH
  } = option;
  return (0, _pipe.default)((0, _ChartConfigFn.crAreaConfig)({
    spacingTop: 25
  }), (0, _configBuilderFn.fAddTooltip)(_Tooltip.tooltipValueTdmyIf), (0, _configBuilderFn.fAddMinMax)(dC, {
    minY: minClose,
    maxY: maxClose,
    isNotZoomToMinMax,
    isDrawDeltaExtrems
  }), fAddMiniVolume({
    id,
    dColumn: dVc,
    dVolume: dV
  }), fAddMiniATH({
    id,
    data: dATH
  }), _fSetStockSerias(seriaType, seriaWidth, dC, dH, dL, dO));
};
exports.crStockConfig = crStockConfig;
//# sourceMappingURL=stockBuilderFn.js.map