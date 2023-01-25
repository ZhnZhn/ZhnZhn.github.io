"use strict";

exports.__esModule = true;
exports.default = void 0;
var _Color = require("../constants/Color");
var _Chart = require("./Chart");
var _IndicatorConfigFn = require("./IndicatorConfigFn");
var _Tooltip = require("./Tooltip");
var _stockBuilderFn = require("./stockBuilderFn");
const _crScatterSeria = (color, pointFormatter, data) => ({
    type: 'scatter',
    color,
    data,
    tooltip: (0, _Chart.fTooltip)(pointFormatter)
  }),
  _crDividendSeria = data => _crScatterSeria(_Color.COLOR_EX_DIVIDEND, _Tooltip.tooltipExDividend, data),
  _crSplitRatioSeria = data => _crScatterSeria(_Color.COLOR_SPLIT_RATIO, _Tooltip.tooltipSplitRatio, data);
const ConfigStockSlice = {
  //seriaType, lineWidth, dC, dH, dL, dO
  _setStockSerias() {
    (0, _stockBuilderFn._fSetStockSerias)(...arguments)(this.config);
    return this;
  },
  stockConfig(id, option) {
    this.config = (0, _stockBuilderFn.crStockConfig)(id, option);
    return this;
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
    (0, _stockBuilderFn.fAddMiniVolume)(option)(this.config);
    return this;
  },
  addMiniATH(option) {
    (0, _stockBuilderFn.fAddMiniATH)(option)(this.config);
    return this;
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