"use strict";

exports.__esModule = true;
exports.default = void 0;

var _Color = require("../constants/Color");

var _Chart = require("./Chart");

var _ChartConfigFn = require("./ChartConfigFn");

var _IndicatorConfigFn = require("./IndicatorConfigFn");

var _Tooltip = require("./Tooltip");

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
  tooltip: (0, _Chart.fTooltip)(pointFormatter)
}),
      _crDividendSeria = data => _crScatterSeria(_Color.COLOR_EX_DIVIDEND, _Tooltip.tooltipExDividend, data),
      _crSplitRatioSeria = data => _crScatterSeria(_Color.COLOR_SPLIT_RATIO, _Tooltip.tooltipSplitRatio, data);

const ConfigStockSlice = {
  _setStockSerias(seriaType, lineWidth, dC, dH, dL, dO) {
    const config = this.config,
          type = (0, _Chart.crType)(seriaType, 'area');
    (0, _ChartConfigFn.setSeriaDataTo)(config, dC, 0, 'Close', {
      type,
      lineWidth
    });
    (0, _ChartConfigFn.setSeriaDataTo)(config, dH, 1, 'High', _crSeriaOption(_Color.COLOR_S_HIGH, lineWidth));
    (0, _ChartConfigFn.setSeriaDataTo)(config, dL, 2, 'Low', _crSeriaOption(_Color.COLOR_S_LOW, lineWidth));
    (0, _ChartConfigFn.setSeriaDataTo)(config, dO, 3, 'Open', _crSeriaOption(_Color.COLOR_S_OPEN, lineWidth));
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