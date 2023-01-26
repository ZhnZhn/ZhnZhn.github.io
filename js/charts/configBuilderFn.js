"use strict";

exports.__esModule = true;
exports.toConfig = exports.fAddTooltip = exports.fAddSeries = exports.fAddMinMax = exports.fAddLegend = exports.fAddCaption = exports.fAdd = exports.crArea2Config = exports._fAddScatterBottom = exports._addMini = void 0;
var _seriaFn = require("../math/seriaFn");
var _isTypeFn = require("../utils/isTypeFn");
var _ChartConfigFn = require("./ChartConfigFn");
var _Chart = require("./Chart");
var _ChartFn = require("./ChartFn");
var _seriaBuilderHelpers = require("./seriaBuilderHelpers");
var _configBuilderHelpers = require("./configBuilderHelpers");
const _isArr = Array.isArray;
const fAddCaption = (title, subtitle) => config => {
  config.title = (0, _Chart.fTitle)({
    text: title
  });
  config.subtitle = (0, _Chart.fSubtitle)({
    text: subtitle
  });
  return config;
};
exports.fAddCaption = fAddCaption;
const fAdd = (propName, option) => config => {
  if ((0, _isTypeFn.isStr)(propName)) {
    (0, _configBuilderHelpers.assignTo)(config, propName, option);
  } else if ((0, _isTypeFn.isObj)(propName)) {
    let _propName;
    for (_propName in propName) {
      (0, _configBuilderHelpers.assignTo)(config, _propName, propName[_propName]);
    }
  }
  return config;
};
exports.fAdd = fAdd;
const fAddTooltip = tooltip => config => {
  config.tooltip = (0, _Chart.fTooltip)(tooltip);
  return config;
};
exports.fAddTooltip = fAddTooltip;
const fAddLegend = legend => config => (0, _isTypeFn.isNotEmptyArr)(legend) ? fAdd('zhConfig', {
  legend
})(config) : config;
exports.fAddLegend = fAddLegend;
const fAddSeries = function (series, isWithoutLegend) {
  if (isWithoutLegend === void 0) {
    isWithoutLegend = false;
  }
  return config => {
    const _to = _isArr(config.series) ? config.series : config.series = [];
    if (_isArr(series)) {
      const _legend = (0, _seriaBuilderHelpers.addSeriesImpl)(_to, series);
      if (!isWithoutLegend) {
        fAddLegend(_legend)(config);
      }
    } else if ((0, _isTypeFn.isObj)(series)) {
      _to[0] = series;
    }
    return config;
  };
};
exports.fAddSeries = fAddSeries;
const _fAddZhMiniConfig = miniConfig => config => {
  const _configs = config.zhMiniConfigs;
  if (_isArr(_configs)) {
    _configs.push(miniConfig);
  } else {
    config.zhMiniConfigs = [miniConfig];
  }
  return config;
};
const _addMini = (data, option, crConfig, toConfig) => data && data.length > 0 ? _fAddZhMiniConfig(crConfig(option))(toConfig) : toConfig;
exports._addMini = _addMini;
const _setMinMax = (min, max, noZoom, config) => {
  (0, _ChartFn.setPlotLinesMinMax)({
    plotLines: config.yAxis.plotLines,
    min,
    max
  });
  fAdd('yAxis', {
    min: (0, _configBuilderHelpers.calcYAxisMin)(min, max, noZoom),
    maxPadding: 0.15,
    minPadding: 0.15,
    endOnTick: false,
    startOnTick: false
  })(config);
};
const _setMinMaxDeltas = (min, max, data, isDrawDeltaExtrems, config) => {
  if (isDrawDeltaExtrems) {
    const _recentIndex = data.length - 1;
    if (_recentIndex > 0) {
      (0, _ChartFn.setPlotLinesDeltas)({
        plotLines: config.yAxis.plotLines,
        min,
        max,
        value: (0, _configBuilderHelpers.getYFromPoint)(data[_recentIndex])
      });
    }
  }
};
const _setYAxisType = (isLogarithmic, data, config) => {
  if (isLogarithmic) {
    if (!(0, _ChartConfigFn.isLineType)(config) || (0, _seriaFn.hasZeroOrLessValue)(data)) {
      return;
    }
    const {
      yAxis
    } = config;
    yAxis.type = 'logarithmic';
    //yAxis.minorTickInterval = 0.1
    if (yAxis.min <= 0) {
      yAxis.min = null;
    }
  }
};
const fAddMinMax = (data, option) => config => {
  const {
      isNotZoomToMinMax,
      isDrawDeltaExtrems,
      isFilterZero,
      isLogarithmic,
      minY,
      maxY
    } = option,
    _data = isFilterZero ? (0, _seriaFn.filterTrimZero)(data) : data,
    min = (0, _configBuilderHelpers.findMinYData)(minY, _data),
    max = (0, _configBuilderHelpers.findMaxYData)(maxY, _data);
  _setMinMax(min, max, isNotZoomToMinMax, config);
  _setMinMaxDeltas(min, max, _data, isDrawDeltaExtrems, config);
  _setYAxisType(isLogarithmic, _data, config);
  return config;
};
exports.fAddMinMax = fAddMinMax;
const _fAddScatterBottom = (seria, name, min, max) => config => {
  const {
    data
  } = seria;
  if (data.length > 0) {
    const {
      series,
      chart,
      zhConfig
    } = config;
    (0, _ChartFn.setYToPoints)(data, (0, _ChartFn.calcMinY)(min, max));
    seria.visible = false;
    series.push(seria);
    chart.spacingBottom = 40;
    zhConfig.legend.push({
      index: series.length - 1,
      color: seria.color,
      name
    });
  }
  return config;
};
exports._fAddScatterBottom = _fAddScatterBottom;
const _disableAnimation = config => {
  fAdd({
    chart: {
      animation: false
    },
    plotOptions: {
      series: {
        animation: false
      }
    },
    zhConfig: {
      withoutAnimation: true
    }
  })(config);
};
const _checkDataLength = config => {
  const data = (0, _configBuilderHelpers.getFirstSeriaData)({
    config
  });
  if (data.length > 3000) {
    _disableAnimation(config);
  }
};
const toConfig = config => {
  _checkDataLength(config);
  return config;
};
exports.toConfig = toConfig;
const crArea2Config = (title, subtitle) => {
  const config = fAddCaption(title, subtitle)((0, _ChartConfigFn.crAreaConfig)({
    spacingTop: 25
  }));
  config.series = [];
  return config;
};
exports.crArea2Config = crArea2Config;
//# sourceMappingURL=configBuilderFn.js.map