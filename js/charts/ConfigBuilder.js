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

var _SeriaBuilder = _interopRequireDefault(require("./SeriaBuilder"));

var _ConfigStockSlice = _interopRequireDefault(require("./ConfigStockSlice"));

var findMinY = _seriaFn["default"].findMinY,
    findMaxY = _seriaFn["default"].findMaxY,
    filterTrimZero = _seriaFn["default"].filterTrimZero;
var fTitle = _Chart["default"].fTitle,
    fSubtitle = _Chart["default"].fSubtitle,
    fTooltip = _Chart["default"].fTooltip;
var setPlotLinesMinMax = _ChartFn["default"].setPlotLinesMinMax,
    setPlotLinesDeltas = _ChartFn["default"].setPlotLinesDeltas,
    calcMinY = _ChartFn["default"].calcMinY,
    setYToPoints = _ChartFn["default"].setYToPoints;
var crAreaConfig = _ChartConfig["default"].crAreaConfig,
    crTreeMapConfig = _ChartConfig["default"].crTreeMapConfig;
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

var _isArr = Array.isArray,
    _assign = Object.assign,
    _assignTo = function _assignTo(obj, propName, value) {
  obj[propName] = _assign(obj[propName] || {}, value);
};

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

var _findMinY = function _findMinY(minY, data) {
  return _isNumber(minY) ? minY : findMinY(data);
};

var _findMaxY = function _findMaxY(maxY, data) {
  return _isNumber(maxY) ? maxY : findMaxY(data);
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

ConfigBuilder.prototype = _assign(ConfigBuilder.prototype, (0, _extends2["default"])({}, _SeriaBuilder["default"], _ConfigStockSlice["default"], {
  init: function init(config) {
    if (config === void 0) {
      config = {};
    }

    this.config = config;
    return this;
  },
  areaConfig: function areaConfig(option) {
    this.config = crAreaConfig(option);
    return this;
  },
  area2Config: function area2Config(title, subtitle) {
    return this.areaConfig({
      spacingTop: 25
    }).addCaption(title, subtitle).add('series', []);
  },
  categoryConfig: function categoryConfig(categories) {
    if (categories === void 0) {
      categories = [];
    }

    this.config = crAreaConfig();
    var xAxis = (0, _extends2["default"])({}, C.CATEGORIES_X_AXIS, {
      categories: categories
    });
    this.add('xAxis', xAxis);
    this.add('yAxis', C.CATEGORIES_Y_AXIS);
    return this;
  },
  barOrColumnConfig: function barOrColumnConfig(type, categories, option) {
    if (categories === void 0) {
      categories = [];
    }

    var _crConfig = type === 'BAR' ? _ChartFactory["default"].crBarConfig : _ChartFactory["default"].crColumnConfig;

    this.config = _crConfig(option);
    return this.add('xAxis', {
      categories: categories
    });
  },
  treeMapConfig: function treeMapConfig() {
    this.config = crTreeMapConfig();
    return this;
  },
  addTitle: function addTitle(text) {
    _assignTo(this.config, 'title', fTitle({
      text: text
    }));

    return this;
  },
  addSubtitle: function addSubtitle(text) {
    _assignTo(this.config, 'subtitle', fSubtitle({
      text: text
    }));

    return this;
  },
  addCaption: function addCaption(title, subtitle) {
    return this.addTitle(title).addSubtitle(subtitle);
  },
  addTooltip: function addTooltip(tooltip) {
    this.config.tooltip = fTooltip(tooltip);
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
  _addMini: function _addMini(data, option, crConfig) {
    return data && data.length > 0 ? this.addZhMiniConfig(crConfig(option)) : this;
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
        min = _findMinY(minY, _data),
        max = _findMaxY(maxY, _data);

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
  _addScatterBottom: function _addScatterBottom(seria, name, min, max) {
    var data = seria.data;

    if (data.length > 0) {
      var _this$config = this.config,
          series = _this$config.series,
          chart = _this$config.chart,
          zhConfig = _this$config.zhConfig;
      setYToPoints(data, calcMinY(min, max));
      seria.visible = false;
      series.push(seria);
      chart.spacingBottom = 40;
      zhConfig.legend.push({
        index: series.length - 1,
        color: seria.color,
        name: name
      });
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