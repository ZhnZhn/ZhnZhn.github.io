"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _Color = _interopRequireDefault(require("../constants/Color"));

var _Chart = _interopRequireDefault(require("./Chart"));

var _ChartConfig = _interopRequireDefault(require("./ChartConfig"));

var _Tooltip = _interopRequireDefault(require("./Tooltip"));

var fTooltip = _Chart["default"].fTooltip;
var setSerieData = _ChartConfig["default"].setSerieData,
    crMiniVolumeConfig = _ChartConfig["default"].crMiniVolumeConfig,
    crMiniATHConfig = _ChartConfig["default"].crMiniATHConfig,
    crMiniHLConfig = _ChartConfig["default"].crMiniHLConfig;

var _isStr = function _isStr(str) {
  return typeof str === 'string';
};

var _crSeriaOption = function _crSeriaOption(color) {
  return {
    type: 'line',
    visible: false,
    color: color,
    marker: {
      radius: 3,
      symbol: "circle"
    }
  };
};

var _crScatterSeria = function _crScatterSeria(color, pointFormatter, data) {
  return {
    type: 'scatter',
    color: color,
    data: data,
    tooltip: fTooltip(pointFormatter)
  };
},
    _crDividendSeria = function _crDividendSeria(data) {
  return _crScatterSeria(_Color["default"].EX_DIVIDEND, _Tooltip["default"].exDividend, data);
},
    _crSplitRatioSeria = function _crSplitRatioSeria(data) {
  return _crScatterSeria(_Color["default"].SPLIT_RATIO, _Tooltip["default"].splitRatio, data);
};

var ConfigStockSlice = {
  setStockSerias: function setStockSerias(seriaType, d, dH, dL, dO) {
    var config = this.config;
    setSerieData(config, d, 0, 'Close', {
      type: seriaType || 'area'
    });
    setSerieData(config, dH, 1, 'High', _crSeriaOption(_Color["default"].S_HIGH));
    setSerieData(config, dL, 2, 'Low', _crSeriaOption(_Color["default"].S_LOW));
    setSerieData(config, dO, 3, 'Open', _crSeriaOption(_Color["default"].S_OPEN));
    return this;
  },
  stockConfig: function stockConfig(id, option) {
    var isNotZoomToMinMax = option.isNotZoomToMinMax,
        isDrawDeltaExtrems = option.isDrawDeltaExtrems,
        sT = option.seriaType,
        seriaColor = option.seriaColor,
        seriaWidth = option.seriaWidth,
        dC = option.dC,
        dH = option.dH,
        dL = option.dL,
        dO = option.dO,
        minClose = option.minClose,
        maxClose = option.maxClose,
        dVc = option.dVc,
        dV = option.dV,
        dATH = option.dATH,
        seriaType = _isStr(sT) ? sT.toLowerCase() : 'area';
    return this.areaConfig({
      spacingTop: 25,
      seriaType: seriaType,
      seriaColor: seriaColor,
      seriaWidth: seriaWidth
    }).addTooltip(_Tooltip["default"].vTdmyIf).addMiniVolume({
      id: id,
      dColumn: dVc,
      dVolume: dV
    }).addMiniATH({
      id: id,
      data: dATH
    }).setMinMax(minClose, maxClose, isNotZoomToMinMax).setMinMaxDeltas(minClose, maxClose, dC, isDrawDeltaExtrems).setStockSerias(seriaType, dC, dH, dL, dO);
  },
  //Used only by Alpha Vantage Daily Adjusted, Quandl EOD
  addDividend: function addDividend(data, min, max) {
    var seria = _crDividendSeria(data);

    return this._addScatterBottom(seria, 'Dividend', min, max);
  },
  //Used only by Quandl EOD
  addSplitRatio: function addSplitRatio(data, min, max) {
    var seria = _crSplitRatioSeria(data);

    return this._addScatterBottom(seria, 'Split Ratio', min, max);
  },
  addMiniVolume: function addMiniVolume(option) {
    var dVolume = option.dVolume;
    return this._addMini(dVolume, option, crMiniVolumeConfig);
  },
  addMiniATH: function addMiniATH(option) {
    var data = option.data;
    return this._addMini(data, option, crMiniATHConfig);
  },
  addMiniHL: function addMiniHL(option) {
    var data = option.data;
    return this._addMini(data, option, crMiniHLConfig);
  }
};
var _default = ConfigStockSlice;
exports["default"] = _default;
//# sourceMappingURL=ConfigStockSlice.js.map