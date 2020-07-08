"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _seriaFn = _interopRequireDefault(require("../math/seriaFn"));

var _Chart = _interopRequireDefault(require("./Chart"));

var _ChartFn = _interopRequireDefault(require("./ChartFn"));

var _ChartConfig = _interopRequireDefault(require("./ChartConfig"));

var _ChartFactory = _interopRequireDefault(require("./ChartFactory"));

var _Tooltip = _interopRequireDefault(require("./Tooltip"));

var _SeriaBuilder = _interopRequireDefault(require("./SeriaBuilder"));

var findMinY = _seriaFn["default"].findMinY,
    findMaxY = _seriaFn["default"].findMaxY,
    filterTrimZero = _seriaFn["default"].filterTrimZero;
var setPlotLinesMinMax = _ChartFn["default"].setPlotLinesMinMax,
    setPlotLinesDeltas = _ChartFn["default"].setPlotLinesDeltas,
    calcMinY = _ChartFn["default"].calcMinY,
    setYToPoints = _ChartFn["default"].setYToPoints;
var crDividendSeria = _ChartConfig["default"].crDividendSeria,
    crMiniVolumeConfig = _ChartConfig["default"].crMiniVolumeConfig,
    crMiniATHConfig = _ChartConfig["default"].crMiniATHConfig,
    crMiniHLConfig = _ChartConfig["default"].crMiniHLConfig;
var C = {
  CATEGORIES_X_AXIS: {
    type: "category",
    categories: [],
    opposite: false,
    labels: {
      y: 18
    },
    crosshair: undefined,
    tickColor: "gray",
    tickWidth: 3,
    tickLength: 7,
    tickPosition: "outside",
    gridLineWidth: 0
  },
  CATEGORIES_Y_AXIS: {
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
  }
};
var _assign = Object.assign;
var _isArr = Array.isArray;

var _isObj = function _isObj(obj) {
  return obj && typeof obj === 'object';
};

var _isStr = function _isStr(str) {
  return typeof str === 'string';
};

var _isNumber = function _isNumber(n) {
  return typeof n === 'number' && n - n === 0;
};

var _getY = function _getY(point) {
  return _isArr(point) ? point[1] : point && point.y || 0;
};

var _getData = function _getData(obj) {
  var _obj$config, _obj$config$series;

  return ((_obj$config = obj.config) == null ? void 0 : (_obj$config$series = _obj$config.series) == null ? void 0 : _obj$config$series[0].data) || [];
};

var ConfigBuilder = function ConfigBuilder(config) {
  if (config === void 0) {
    config = {};
  }

  if (!(this instanceof ConfigBuilder)) {
    return new ConfigBuilder(config);
  }

  this.config = config;
};

ConfigBuilder.crSeria = function (_ref) {
  var adapter = _ref.adapter,
      json = _ref.json,
      option = _ref.option,
      type = _ref.type;

  var _adapter$toConfig = adapter.toConfig(json, option),
      config = _adapter$toConfig.config,
      _seria = config.series[0];

  _seria.minY = findMinY(_seria.data);

  if (type) {
    _seria.type = type;
  }

  return _seria;
};

ConfigBuilder.prototype = _assign(ConfigBuilder.prototype, (0, _extends2["default"])({}, _SeriaBuilder["default"], {
  init: function init(config) {
    if (config === void 0) {
      config = {};
    }

    this.config = config;
    return this;
  },
  areaConfig: function areaConfig(option) {
    this.config = _ChartConfig["default"].crAreaConfig(option);
    return this;
  },
  area2Config: function area2Config(title, subtitle) {
    return this.areaConfig({
      spacingTop: 25
    }).addCaption(title, subtitle).clearSeries();
  },
  stockConfig: function stockConfig(id, dataOption) {
    var dataVolumeColumn = dataOption.dataVolumeColumn,
        dataVolume = dataOption.dataVolume,
        dataATH = dataOption.dataATH,
        minClose = dataOption.minClose,
        maxClose = dataOption.maxClose,
        isNotZoomToMinMax = dataOption.isNotZoomToMinMax,
        isDrawDeltaExtrems = dataOption.isDrawDeltaExtrems,
        data = dataOption.data,
        dataHigh = dataOption.dataHigh,
        dataLow = dataOption.dataLow,
        dataOpen = dataOption.dataOpen;
    return this.areaConfig({
      spacingTop: 25
    }).addTooltip(_Tooltip["default"].fnBasePointFormatter).addMiniVolume({
      id: id,
      dColumn: dataVolumeColumn,
      dVolume: dataVolume
    }).addMiniATH({
      id: id,
      data: dataATH
    }).setMinMax(minClose, maxClose, isNotZoomToMinMax).setMinMaxDeltas(minClose, maxClose, data, isDrawDeltaExtrems).setStockSerias(id, data, dataHigh, dataLow, dataOpen);
  },
  intradayConfig: function intradayConfig(_ref2) {
    var id = _ref2.id,
        data = _ref2.data,
        dH = _ref2.dH,
        dL = _ref2.dL,
        dO = _ref2.dO,
        minClose = _ref2.minClose,
        maxClose = _ref2.maxClose,
        dVolume = _ref2.dVolume,
        dColumn = _ref2.dColumn;
    return this.areaConfig().add('chart', {
      spacingTop: 25,
      marginBottom: 20
    }).addTooltip(_Tooltip["default"].fnBasePointFormatterT).setStockSerias(id, data, dH, dL, dO).setMinMax(minClose, maxClose, false).addMiniVolume({
      id: id,
      dVolume: dVolume,
      dColumn: dColumn,
      tooltipColumn: _Chart["default"].fTooltip(_Tooltip["default"].volumeDmyt)
    });
  },
  categoryConfig: function categoryConfig(categories) {
    if (categories === void 0) {
      categories = [];
    }

    this.config = _ChartConfig["default"].crAreaConfig();
    var xAxis = (0, _extends2["default"])({}, C.CATEGORIES_X_AXIS, {
      categories: categories
    });
    this.add('xAxis', xAxis);
    this.add('yAxis', C.CATEGORIES_Y_AXIS);
    return this;
  },
  _columnConfig: function _columnConfig(categories, option) {
    if (categories === void 0) {
      categories = [];
    }

    this.config = _ChartFactory["default"].crColumnConfig(option);
    this.add('xAxis', {
      categories: categories
    });
    return this;
  },
  _barConfig: function _barConfig(categories, option) {
    if (categories === void 0) {
      categories = [];
    }

    this.config = _ChartFactory["default"].crBarConfig(option);
    this.add('xAxis', {
      categories: categories
    });
    return this;
  },
  barOrColumnConfig: function barOrColumnConfig(type, categories, option) {
    if (categories === void 0) {
      categories = [];
    }

    if (type === 'BAR') {
      return this._barConfig(categories, option);
    }

    return this._columnConfig(categories, option);
  },
  treeMapConfig: function treeMapConfig() {
    this.config = _ChartConfig["default"].fBaseTreeMapConfig();
    return this;
  },
  alignButtonExport: function alignButtonExport() {
    _assign(this.config.navigation.buttonOptions, {
      x: -10,
      y: -20
    });

    return this;
  },
  addTitle: function addTitle(title) {
    var _to = this.config.title || {};

    this.config.title = _assign(_to, _Chart["default"].fTitle({
      text: title,
      y: _Chart["default"].STACKED_TITLE_Y
    }));
    return this;
  },
  addSubtitle: function addSubtitle(subtitle) {
    var _to = this.config.subtitle || {};

    this.config.subtitle = _assign(_to, _Chart["default"].fSubtitle({
      text: subtitle,
      y: _Chart["default"].STACKED_SUBTITLE_Y
    }));
    return this;
  },
  addCaption: function addCaption(title, subtitle) {
    if (title === void 0) {
      title = '';
    }

    if (subtitle === void 0) {
      subtitle = '';
    }

    return this.addTitle(title).addSubtitle(subtitle);
  },
  addTooltip: function addTooltip(tooltip) {
    this.config.tooltip = _Chart["default"].fTooltip(tooltip);
    return this;
  },
  addXAxisCrosshair: function addXAxisCrosshair() {
    this.add('xAxis', {
      crosshair: _Chart["default"].fCrosshair()
    });
    return this;
  },
  add: function add(propName, option) {
    if (_isStr(propName)) {
      var _to = this.config[propName];

      if (_isObj(_to)) {
        _assign(_to, option);
      } else {
        this.config[propName] = option;
      }
    } else if (_isObj(propName)) {
      var _propName;

      for (_propName in propName) {
        var _to2 = this.config[_propName],
            _from = propName[_propName];

        if (_to2) {
          _assign(_to2, _from);
        } else {
          this.config[_propName] = _from;
        }
      }
    }

    return this;
  },
  addZhMiniConfig: function addZhMiniConfig(config) {
    var _configs = this.config.zhMiniConfigs;

    if (_configs) {
      _configs.push(config);
    } else {
      this.config.zhMiniConfigs = [config];
    }

    return this;
  },
  addMiniVolume: function addMiniVolume(option) {
    var dVolume = option.dVolume;
    return dVolume && dVolume.length > 0 ? this.addZhMiniConfig(crMiniVolumeConfig(option)) : this;
  },
  addMiniATH: function addMiniATH(option) {
    var data = option.data;
    return data && data.length > 0 ? this.addZhMiniConfig(crMiniATHConfig(option)) : this;
  },
  addMiniHL: function addMiniHL(option) {
    var data = option.data;
    return data && data.length > 0 ? this.addZhMiniConfig(crMiniHLConfig(option)) : this;
  },
  addZhPoints: function addZhPoints(data, fn) {
    this.add({
      zhPoints: data,
      zhIsMfi: true //zhFnGetMfiConfig: fn

    });
    return this;
  },
  addLegend: function addLegend(legend) {
    return this.add('zhConfig', {
      legend: legend
    });
  },
  addMinMax: function addMinMax(data, option) {
    var isNotZoomToMinMax = option.isNotZoomToMinMax,
        isDrawDeltaExtrems = option.isDrawDeltaExtrems,
        isFilterZero = option.isFilterZero,
        minY = option.minY,
        maxY = option.maxY,
        _data = isFilterZero ? filterTrimZero(data) : data,
        min = _isNumber(minY) ? minY : findMinY(_data),
        max = _isNumber(maxY) ? maxY : findMaxY(_data);

    return this.setMinMax(min, max, isNotZoomToMinMax).setMinMaxDeltas(min, max, _data, isDrawDeltaExtrems);
  },
  setMinMaxDeltas: function setMinMaxDeltas(min, max, data, isDrawDeltaExtrems) {
    if (isDrawDeltaExtrems) {
      var _recentIndex = data.length - 1;

      if (_recentIndex > 0) {
        setPlotLinesDeltas({
          plotLines: this.config.yAxis.plotLines,
          min: min,
          max: max,
          value: _getY(data[_recentIndex])
        });
      }
    }

    return this;
  },
  _setYAxisMin: function _setYAxisMin(min, max, noZoom) {
    var _min = noZoom && min > 0 ? 0 : _Chart["default"].calcMinY({
      minPoint: min,
      maxPoint: max
    });

    this.add('yAxis', {
      min: _min,
      maxPadding: 0.15,
      minPadding: 0.15,
      endOnTick: false,
      startOnTick: false
    });
  },
  setMinMax: function setMinMax(min, max, noZoom) {
    setPlotLinesMinMax({
      plotLines: this.config.yAxis.plotLines,
      min: min,
      max: max
    });

    this._setYAxisMin(min, max, noZoom);

    return this;
  },
  setStockSerias: function setStockSerias(id, d, dH, dL, dO) {
    _ChartConfig["default"].setStockSerias(this.config, d, dH, dL, dO, id);

    return this;
  },

  /*
  checkThreshold(seriaIndex=0){
    const config = this.config
    , { series=[] } = config
    , seria = series[seriaIndex] || {}
    , data = seria.data || [];
    /*
    if (_isArr(data) && data.length > 1000) {
      config.plotOptions = _assign(
        config.plotOptions || {}, {
          series: {
            turboThreshold: 0
          }
        }
      )
    }
    return this;
  },
  */
  addDividend: function addDividend(_ref3) {
    var dataDividend = _ref3.dataDividend,
        minClose = _ref3.minClose,
        maxClose = _ref3.maxClose;

    if (dataDividend.length > 0) {
      setYToPoints(dataDividend, calcMinY({
        min: minClose,
        max: maxClose
      }));
      this.config.series.push(crDividendSeria(dataDividend, 'exDividend'));
      this.config.chart.spacingBottom = 40;
    }

    return this;
  },
  _disableAnimation: function _disableAnimation() {
    return this.add({
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
    });
  },
  _checkDataLength: function _checkDataLength() {
    var data = _getData(this);

    if (data.length > 3000) {
      this._disableAnimation();
    }

    return this;
  },
  toConfig: function toConfig() {
    this._checkDataLength();

    return this.config;
  }
}));
var _default = ConfigBuilder;
exports["default"] = _default;
//# sourceMappingURL=ConfigBuilder.js.map