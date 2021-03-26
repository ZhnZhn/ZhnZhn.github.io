"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _seriaFn = _interopRequireDefault(require("../math/seriaFn"));

var _Color = _interopRequireDefault(require("../constants/Color"));

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
    crSplitRatioSeria = _ChartConfig["default"].crSplitRatioSeria,
    crMiniVolumeConfig = _ChartConfig["default"].crMiniVolumeConfig,
    crMiniATHConfig = _ChartConfig["default"].crMiniATHConfig,
    crMiniHLConfig = _ChartConfig["default"].crMiniHLConfig,
    setSerieData = _ChartConfig["default"].setSerieData;
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
},
    _isStr = function _isStr(str) {
  return typeof str === 'string';
},
    _isNumber = function _isNumber(n) {
  return typeof n === 'number' && n - n === 0;
},
    _isNotEmptyArr = function _isNotEmptyArr(arr) {
  return _isArr(arr) && arr.length > 0;
};

var _getY = function _getY(point) {
  return _isArr(point) ? point[1] : point && point.y || 0;
};

var _getData = function _getData(obj) {
  var _obj$config, _obj$config$series;

  return ((_obj$config = obj.config) == null ? void 0 : (_obj$config$series = _obj$config.series) == null ? void 0 : _obj$config$series[0].data) || [];
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
      dVolume: dV,
      tooltipColumn: _Chart["default"].fTooltip(_Tooltip["default"].volumeTdmyIf)
    }).addMiniATH({
      id: id,
      data: dATH
    }).setMinMax(minClose, maxClose, isNotZoomToMinMax).setMinMaxDeltas(minClose, maxClose, dC, isDrawDeltaExtrems).setStockSerias(seriaType, dC, dH, dL, dO);
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
    this.config = _ChartConfig["default"].crTreeMapConfig();
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
  addZhPointsIf: function addZhPointsIf(data, propName, is) {
    var _this$add;

    if (propName === void 0) {
      propName = 'zhIsMfi';
    }

    if (is === void 0) {
      is = true;
    }

    return is ? this.add((_this$add = {
      zhPoints: data
    }, _this$add[propName] = true, _this$add)) : this;
  },
  addLegend: function addLegend(legend) {
    return _isNotEmptyArr(legend) ? this.add('zhConfig', {
      legend: legend
    }) : this;
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
    var _min = noZoom && min > 0 ? 0 : calcMinY(min, max);

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
  _addScatterBottom: function _addScatterBottom(seria, name) {
    var _this$config = this.config,
        series = _this$config.series,
        chart = _this$config.chart,
        zhConfig = _this$config.zhConfig;
    series.push((0, _extends2["default"])({}, seria, {
      visible: false
    }));
    chart.spacingBottom = 40;
    zhConfig.legend.push({
      index: series.length - 1,
      color: seria.color,
      name: name
    });
    return this;
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