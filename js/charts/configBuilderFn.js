"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.toConfig = exports.setDataSourceTo = exports.setBarConfigHeightIf = exports.fSetSeriaBy = exports.fAddZhPoints = exports.fAddTooltip = exports.fAddSeries = exports.fAddSeriaBy = exports.fAddPointsToConfig = exports.fAddMinMax = exports.fAddLegend = exports.fAddCaption = exports.fAdd = exports.crTreeMapConfig = exports.crSplineSeriaConfig = exports.crSplineConfig = exports.crSeriaConfigFromAdapter = exports.crScatterSeriaConfig = exports.crCategoryConfig = exports.crBarOrColumnConfig = exports.crAreaConfig = exports.crArea2Config = exports._fAddScatterBottom = exports._addMini = void 0;
var _isTypeFn = require("../utils/isTypeFn");
var _pipe = _interopRequireDefault(require("../utils/pipe"));
var _seriaFn = require("../math/seriaFn");
var _seriaHelperFn = require("../math/seriaHelperFn");
var _AdapterFn = require("../adapters/AdapterFn");
var _ChartConfigFn = require("./ChartConfigFn");
var _TreeMapConfigFn = require("./TreeMapConfigFn");
var _Chart = require("./Chart");
var _ChartTheme = require("./ChartTheme");
var _ChartFn = require("./ChartFn");
var _ChartFactory = require("./ChartFactory");
var _Tooltip = require("./Tooltip");
var _seriaBuilderHelpers = require("./seriaBuilderHelpers");
const _assign = Object.assign;
const assignTo = (obj, propName, value) => {
  obj[propName] = (0, _isTypeFn.isObj)(value) && !(0, _isTypeFn.isArr)(value) ? _assign(obj[propName] || {}, value) : value;
};
const _fFindY = findY => (y, data) => (0, _isTypeFn.isNumber)(y) ? y : findY(data),
  findMinYData = _fFindY(_seriaFn.findMinY),
  findMaxYData = _fFindY(_seriaFn.findMaxY);
const fAddCaption = (title, subtitle) => config => {
  config.title = (0, _Chart.fTitle)({
    text: title || subtitle
  });
  if (title && subtitle) {
    config.subtitle = (0, _Chart.fSubtitle)({
      text: subtitle
    });
  }
  return config;
};
exports.fAddCaption = fAddCaption;
const fAdd = (propName, option) => config => {
  if ((0, _isTypeFn.isStr)(propName)) {
    assignTo(config, propName, option);
  } else if ((0, _isTypeFn.isObj)(propName)) {
    let _propName;
    for (_propName in propName) {
      assignTo(config, _propName, propName[_propName]);
    }
  }
  return config;
};
exports.fAdd = fAdd;
const setDataSourceTo = (config, dataSource) => fAdd({
  zhConfig: {
    dataSource
  }
})(config);
exports.setDataSourceTo = setDataSourceTo;
const fAddTooltip = tooltip => config => fAdd('tooltip', (0, _Chart.fTooltip)(tooltip))(config);

//isAddEmpty: UN Comtrade toSeriesConfig case
exports.fAddTooltip = fAddTooltip;
const fAddLegend = (legend, isAddEmpty) => config => (0, _isTypeFn.isNotEmptyArr)(legend) || isAddEmpty && (0, _isTypeFn.isArr)(legend) ? fAdd('zhConfig', {
  legend
})(config) : config;
exports.fAddLegend = fAddLegend;
const fAddSeries = series => config => {
  const _to = (0, _isTypeFn.isArr)(config.series) ? config.series : config.series = [];
  if ((0, _isTypeFn.isArr)(series)) {
    const _legend = (0, _seriaBuilderHelpers.addSeriesImpl)(_to, series);
    fAddLegend(_legend)(config);
  } else if ((0, _isTypeFn.isObj)(series)) {
    _to[0] = series;
  }
  return config;
};
exports.fAddSeries = fAddSeries;
const _fAddZhMiniConfig = miniConfig => config => {
  const _configs = config.zhMiniConfigs;
  if ((0, _isTypeFn.isArr)(_configs)) {
    _configs.push(miniConfig);
  } else {
    config.zhMiniConfigs = [miniConfig];
  }
  return config;
};
const _addMini = (data, option, crConfig, toConfig) => (0, _isTypeFn.isNotEmptyArr)(data) ? _fAddZhMiniConfig(crConfig(option))(toConfig) : toConfig;
exports._addMini = _addMini;
const _setYAxisMin = (yAxisMinValue, config) => {
  fAdd('yAxis', {
    min: yAxisMinValue,
    maxPadding: 0.15,
    minPadding: 0.15,
    endOnTick: false,
    startOnTick: false
  })(config);
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
const _setValueMoving = (_rt, data, config) => {
  config.valueMoving = (0, _AdapterFn.valueMoving)(data, _rt);
};
const _getDeltaValue = (isDrawDeltaExtrems, data) => isDrawDeltaExtrems && data.length > 1 ? (0, _seriaHelperFn.getPointValue)(data[data.length - 1], 0) : void 0;
const fAddMinMax = (data, option) => config => {
  const {
      isNotZoomToMinMax,
      isDrawDeltaExtrems,
      isFilterZero,
      isLogarithmic,
      minY,
      maxY,
      _rt
    } = option,
    _data = isFilterZero ? (0, _seriaFn.filterTrimZero)(data) : data,
    min = findMinYData(minY, _data),
    max = findMaxYData(maxY, _data),
    yAxisMinValue = (0, _ChartFn.calcYAxisMin)(min, max, isNotZoomToMinMax);
  _setYAxisMin(yAxisMinValue, config);
  (0, _ChartFn.setPlotLinesMinMax)(config.yAxis.plotLines, min, max, _getDeltaValue(isDrawDeltaExtrems, _data));
  _setYAxisType(isLogarithmic, _data, config);
  _setValueMoving(_rt, _data, config);
  return config;
};
exports.fAddMinMax = fAddMinMax;
const fAddZhPoints = function (data, propName) {
  if (propName === void 0) {
    propName = 'zhIsMfi';
  }
  return config => data ? fAdd({
    zhPoints: data,
    [propName]: true
  })(config) : config;
};
exports.fAddZhPoints = fAddZhPoints;
const fAddSeriaBy = (index, seriaConfig) => config => {
  const _series = config.series;
  if (_series[index]) {
    _assign(_series[index], seriaConfig);
  } else {
    _series.push(seriaConfig);
  }
  return config;
};
exports.fAddSeriaBy = fAddSeriaBy;
const fSetSeriaBy = (seriaIndex, seriaConfig) => config => {
  config.series[seriaIndex] = seriaConfig;
  return config;
};

/*************************************/
/**********fAddPointsToConfig*********/
exports.fSetSeriaBy = fSetSeriaBy;
const _fAddSeriaPoints = function (points, _temp) {
  let {
    maxVisible = 6
  } = _temp === void 0 ? {} : _temp;
  return config => {
    const _legend = [];
    points.forEach((data, index) => {
      const is = index < maxVisible ? true : false,
        color = (0, _ChartTheme.getSeriaColorByIndex)(index),
        {
          seriaName
        } = data;
      _legend.push((0, _seriaBuilderHelpers.crLegendItem)({
        index,
        color,
        name: seriaName,
        is
      }));
      fAddSeriaBy(index, {
        type: 'spline',
        data: data,
        name: seriaName,
        zhValueText: seriaName,
        visible: is
      })(config);
    });
    if (_legend.length !== 0) {
      fAddLegend(_legend)(config);
    }
    return config;
  };
};

//FAOSTAT
const fAddPointsToConfig = points => config => points[0] && (0, _isTypeFn.isArr)(points[0]) && points[0][0] && !(0, _isTypeFn.isNumber)(points[0][0]) ? _fAddSeriaPoints(points)(config) : fAddSeriaBy(0, {
  type: 'spline',
  data: points
})(config);

/*************************************/
exports.fAddPointsToConfig = fAddPointsToConfig;
const _fAddScatterBottom = (seria, name, min, max) => config => {
  const {
    data
  } = seria;
  if ((0, _isTypeFn.isNotEmptyArr)(data)) {
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
  const data = config?.series?.[0].data || [];
  if (data.length > 3000) {
    _disableAnimation(config);
  }
};
const toConfig = config => {
  _checkDataLength(config);
  return config;
};
exports.toConfig = toConfig;
const crSeriaConfigFromAdapter = _ref => {
  let {
    adapter,
    json,
    option,
    type
  } = _ref;
  const {
      config
    } = adapter.toConfig(json, option),
    _seria = config.series[0];
  _seria.minY = (0, _seriaFn.findMinY)(_seria.data);
  if (type) {
    _seria.type = type;
  }
  return _seria;
};
exports.crSeriaConfigFromAdapter = crSeriaConfigFromAdapter;
const crAreaConfig = option => (0, _ChartConfigFn.crAreaConfig)({
  spacingTop: 25,
  ...option
});
exports.crAreaConfig = crAreaConfig;
const crArea2Config = (title, subtitle) => {
  const config = fAddCaption(title, subtitle)(crAreaConfig());
  config.series = [];
  return config;
};
exports.crArea2Config = crArea2Config;
const CATEGORIES_X_AXIS = {
    type: "category",
    categories: [],
    opposite: false,
    crosshair: void 0,
    tickColor: "grey",
    tickWidth: 3,
    tickLength: 7,
    tickPosition: "outside",
    gridLineWidth: 0,
    labels: {
      y: 18
    }
  },
  CATEGORIES_Y_AXIS = {
    lineWidth: 0,
    tickLength: 0,
    startOnTick: true,
    endOnTick: true,
    minPadding: 0.05,
    maxPadding: 0.05,
    plotLines: null,
    labels: {
      x: 3
    }
  };

//toYearsByMonths
const crCategoryConfig = (categories, title, subtitle) => fAdd({
  xAxis: {
    ...CATEGORIES_X_AXIS,
    ...{
      categories
    }
  },
  yAxis: CATEGORIES_Y_AXIS
})(crArea2Config(title, subtitle));
exports.crCategoryConfig = crCategoryConfig;
const crBarOrColumnConfig = function (type, categories, seriaColor, yAxisLabelsColor) {
  if (categories === void 0) {
    categories = [];
  }
  return fAdd('xAxis', {
    categories
  })((0, _ChartFactory.crBarOrColumnConfigImpl)(type, seriaColor, yAxisLabelsColor));
};
exports.crBarOrColumnConfig = crBarOrColumnConfig;
const HEIGHT_OF_ONE_BAR_CATEGORY = 22,
  BAR_CATEGORY_TOTAL_MARGIN = 85;
const setBarConfigHeightIf = config => {
  const _chart = config.chart;
  if (_chart.type === 'bar') {
    const _categoriesNumber = config.xAxis.categories.length;
    if (_categoriesNumber < 16) {
      _chart.height = BAR_CATEGORY_TOTAL_MARGIN + _categoriesNumber * HEIGHT_OF_ONE_BAR_CATEGORY;
    }
  }
  return config;
};
exports.setBarConfigHeightIf = setBarConfigHeightIf;
const crTreeMapConfig = data => {
  const config = (0, _TreeMapConfigFn.crTreeMapConfig)(),
    seria = (0, _TreeMapConfigFn.crTreeMapSeria)(data);
  seria.tooltip = (0, _Chart.fTooltip)(_Tooltip.tooltipTreeMap);
  return fAddSeries(seria)(config);
};
exports.crTreeMapConfig = crTreeMapConfig;
const CONFIG_SERIA = {
  //type: 'spline',
  visible: true,
  marker: {
    symbol: 'circle'
  }
};
const MAX_NUMBER_OF_VISIBLE_SERIES = 8;
const crSplineSeriaConfig = _ref2 => {
  let {
    data,
    ...restOption
  } = _ref2;
  return (0, _AdapterFn.isSeriesDataCase)(data) ? data.map((seriaData, i) => (0, _ChartConfigFn.crSeriaConfig)({
    ...CONFIG_SERIA,
    ...restOption,
    data: seriaData,
    color: seriaData.color || (0, _ChartTheme.getSeriaColorByIndex)(i),
    name: seriaData.seriaName,
    visible: i < MAX_NUMBER_OF_VISIBLE_SERIES
  })) : (0, _ChartConfigFn.crSeriaConfig)({
    ...CONFIG_SERIA,
    ...restOption,
    data
  });
};
exports.crSplineSeriaConfig = crSplineSeriaConfig;
const CONFIG_SCATTER = {
  type: 'scatter'
};
const crScatterSeriaConfig = (tooltip, option) => fAdd('tooltip', (0, _Chart.fTooltip)(tooltip))({
  ...CONFIG_SCATTER,
  ...option
});
exports.crScatterSeriaConfig = crScatterSeriaConfig;
const crSplineConfig = (data, option) => {
  const {
    seriaType,
    seriaColor,
    seriaWidth
  } = option;
  return (0, _pipe.default)(crArea2Config(option.title, option.subtitle), fAddSeries(crSplineSeriaConfig({
    seriaType,
    seriaColor,
    seriaWidth,
    data
  })), toConfig);
};
exports.crSplineConfig = crSplineConfig;
//# sourceMappingURL=configBuilderFn.js.map