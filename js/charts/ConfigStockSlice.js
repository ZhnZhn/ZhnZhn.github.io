"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _Color = _interopRequireDefault(require("../constants/Color"));

var _ChartConfig = _interopRequireDefault(require("./ChartConfig"));

var _ChartFn = _interopRequireDefault(require("./ChartFn"));

var _Tooltip = _interopRequireDefault(require("./Tooltip"));

var setSerieData = _ChartConfig["default"].setSerieData,
    crMiniVolumeConfig = _ChartConfig["default"].crMiniVolumeConfig,
    crMiniATHConfig = _ChartConfig["default"].crMiniATHConfig,
    crMiniHLConfig = _ChartConfig["default"].crMiniHLConfig,
    crDividendSeria = _ChartConfig["default"].crDividendSeria,
    crSplitRatioSeria = _ChartConfig["default"].crSplitRatioSeria;
var setYToPoints = _ChartFn["default"].setYToPoints,
    calcMinY = _ChartFn["default"].calcMinY;

var _assign = Object.assign,
    _isStr = function _isStr(str) {
  return typeof str === 'string';
};

var _crSeriaOption = function _crSeriaOption(color, option) {
  return _assign({
    type: 'line',
    visible: false,
    color: color,
    marker: {
      radius: 3,
      symbol: "circle"
    }
  }, option);
};

var _crScatterBottomSeria = function _crScatterBottomSeria(crSeria, data, min, max) {
  setYToPoints(data, calcMinY(min, max));
  return crSeria(data);
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
    if (data.length > 0) {
      var seria = _crScatterBottomSeria(crDividendSeria, data, min, max);

      this._addScatterBottom(seria, 'Dividend');
    }

    return this;
  },
  //Used only by Quandl EOD
  addSplitRatio: function addSplitRatio(data, min, max) {
    if (data.length > 0) {
      var seria = _crScatterBottomSeria(crSplitRatioSeria, data, min, max);

      this._addScatterBottom(seria, 'Split Ratio');
    }

    return this;
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