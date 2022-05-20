"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Color = _interopRequireDefault(require("../constants/Color"));

var _Chart = _interopRequireDefault(require("./Chart"));

var _ChartConfig = _interopRequireDefault(require("./ChartConfig"));

var _IndicatorConfigFn = require("./IndicatorConfigFn");

var _Tooltip = require("./Tooltip");

const {
  crType,
  fTooltip
} = _Chart.default;
const {
  setSerieData
} = _ChartConfig.default;

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

const _crScatterSeria = (color, pointFormatter, data) => ({
  type: 'scatter',
  color,
  data,
  tooltip: fTooltip(pointFormatter)
}),
      _crDividendSeria = data => _crScatterSeria(_Color.default.EX_DIVIDEND, _Tooltip.tooltipExDividend, data),
      _crSplitRatioSeria = data => _crScatterSeria(_Color.default.SPLIT_RATIO, _Tooltip.tooltipSplitRatio, data);

const ConfigStockSlice = {
  _setStockSerias(seriaType, lineWidth, dC, dH, dL, dO) {
    const config = this.config,
          type = crType(seriaType, 'area');
    setSerieData(config, dC, 0, 'Close', {
      type,
      lineWidth
    });
    setSerieData(config, dH, 1, 'High', _crSeriaOption(_Color.default.S_HIGH, lineWidth));
    setSerieData(config, dL, 2, 'Low', _crSeriaOption(_Color.default.S_LOW, lineWidth));
    setSerieData(config, dO, 3, 'Open', _crSeriaOption(_Color.default.S_OPEN, lineWidth));
    return this;
  },

  stockConfig(id, option) {
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
    return this.areaConfig({
      spacingTop: 25
    }).addTooltip(_Tooltip.tooltipValueTdmyIf).addMinMax(dC, {
      minY: minClose,
      maxY: maxClose,
      isNotZoomToMinMax,
      isDrawDeltaExtrems
    }).addMiniVolume({
      id,
      dColumn: dVc,
      dVolume: dV
    }).addMiniATH({
      id,
      data: dATH
    })._setStockSerias(seriaType, seriaWidth, dC, dH, dL, dO);
  },

  //Used only by Alpha Vantage Daily Adjusted, Quandl EOD
  addDividend(data, min, max) {
    const seria = _crDividendSeria(data);

    return this._addScatterBottom(seria, 'Dividend', min, max);
  },

  //Used only by Quandl EOD
  addSplitRatio(data, min, max) {
    const seria = _crSplitRatioSeria(data);

    return this._addScatterBottom(seria, 'Split Ratio', min, max);
  },

  addMiniVolume(option) {
    const {
      dVolume
    } = option;
    return this._addMini(dVolume, option, _IndicatorConfigFn.crMiniVolumeConfig);
  },

  addMiniATH(option) {
    const {
      data
    } = option;
    return this._addMini(data, option, _IndicatorConfigFn.crMiniATHConfig);
  },

  addMiniHL(option) {
    const {
      data
    } = option;
    return this._addMini(data, option, _IndicatorConfigFn.crMiniHLConfig);
  }

};
var _default = ConfigStockSlice;
exports.default = _default;
//# sourceMappingURL=ConfigStockSlice.js.map