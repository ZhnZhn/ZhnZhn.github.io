"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _seriaFn = require("../math/seriaFn");
var _isTypeFn = require("../utils/isTypeFn");
var _Chart = require("./Chart");
var _Tooltip = require("./Tooltip");
var _ChartFn = require("./ChartFn");
var _ChartConfigFn = require("./ChartConfigFn");
var _TreeMapConfigFn = require("./TreeMapConfigFn");
var _ChartFactory = require("./ChartFactory");
var _SeriaBuilder = _interopRequireDefault(require("./SeriaBuilder"));
var _ConfigStockSlice = _interopRequireDefault(require("./ConfigStockSlice"));
const CATEGORIES_X_AXIS = {
    type: "category",
    categories: [],
    opposite: false,
    crosshair: void 0,
    tickColor: "gray",
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
const _isArr = Array.isArray,
  _assign = Object.assign,
  _assignTo = (obj, propName, value) => {
    obj[propName] = (0, _isTypeFn.isObj)(value) && !_isArr(value) ? _assign(obj[propName] || {}, value) : value;
  };
const _getY = point => _isArr(point) ? point[1] : point && point.y || 0;
const _getData = obj => {
  var _obj$config, _obj$config$series;
  return ((_obj$config = obj.config) == null ? void 0 : (_obj$config$series = _obj$config.series) == null ? void 0 : _obj$config$series[0].data) || [];
};
const _findMinY = (minY, data) => (0, _isTypeFn.isNumber)(minY) ? minY : (0, _seriaFn.findMinY)(data);
const _findMaxY = (maxY, data) => (0, _isTypeFn.isNumber)(maxY) ? maxY : (0, _seriaFn.findMaxY)(data);
const _calcYAxisMin = (min, max, noZoom) => noZoom && min > 0 ? 0 : (0, _ChartFn.calcMinY)(min, max);
const ConfigBuilder = function (config) {
  if (config === void 0) {
    config = {};
  }
  if (!(this instanceof ConfigBuilder)) {
    return new ConfigBuilder(config);
  }
  this.config = config;
};
ConfigBuilder.crSeria = _ref => {
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
ConfigBuilder.prototype = _assign(ConfigBuilder.prototype, {
  ..._SeriaBuilder.default,
  ..._ConfigStockSlice.default,
  init(config) {
    if (config === void 0) {
      config = {};
    }
    this.config = config;
    return this;
  },
  areaConfig(option) {
    this.config = (0, _ChartConfigFn.crAreaConfig)(option);
    return this;
  },
  area2Config(title, subtitle) {
    return this.areaConfig({
      spacingTop: 25
    }).addCaption(title, subtitle).add('series', []);
  },
  categoryConfig(categories) {
    if (categories === void 0) {
      categories = [];
    }
    this.config = (0, _ChartConfigFn.crAreaConfig)({
      spacingTop: 25
    });
    const xAxis = {
      ...CATEGORIES_X_AXIS,
      ...{
        categories
      }
    };
    return this.add('xAxis', xAxis).add('yAxis', CATEGORIES_Y_AXIS);
  },
  barOrColumnConfig(type, categories) {
    if (categories === void 0) {
      categories = [];
    }
    const _crConfig = type === 'BAR' ? _ChartFactory.crBarConfig : _ChartFactory.crColumnConfig;
    this.config = _crConfig();
    return this.add('xAxis', {
      categories
    });
  },
  treeMapConfig(data) {
    this.config = (0, _TreeMapConfigFn.crTreeMapConfig)();
    return this.addSeries(ConfigBuilder().treeMapSeria(_Tooltip.tooltipTreeMap, {
      data
    }).toSeria());
  },
  addTitle(text) {
    _assignTo(this.config, 'title', (0, _Chart.fTitle)({
      text
    }));
    return this;
  },
  addSubtitle(text) {
    _assignTo(this.config, 'subtitle', (0, _Chart.fSubtitle)({
      text
    }));
    return this;
  },
  addCaption(title, subtitle) {
    return this.addTitle(title).addSubtitle(subtitle);
  },
  addTooltip(tooltip) {
    this.config.tooltip = (0, _Chart.fTooltip)(tooltip);
    return this;
  },
  add(propName, option) {
    if ((0, _isTypeFn.isStr)(propName)) {
      _assignTo(this.config, propName, option);
    } else if ((0, _isTypeFn.isObj)(propName)) {
      let _propName;
      for (_propName in propName) {
        _assignTo(this.config, _propName, propName[_propName]);
      }
    }
    return this;
  },
  addZhMiniConfig(config) {
    const _configs = this.config.zhMiniConfigs;
    if (_configs) {
      _configs.push(config);
    } else {
      this.config.zhMiniConfigs = [config];
    }
    return this;
  },
  _addMini(data, option, crConfig) {
    return data && data.length > 0 ? this.addZhMiniConfig(crConfig(option)) : this;
  },
  addZhPointsIf(data, propName, is) {
    if (propName === void 0) {
      propName = 'zhIsMfi';
    }
    if (is === void 0) {
      is = true;
    }
    return is ? this.add({
      zhPoints: data,
      [propName]: true
    }) : this;
  },
  addLegend(legend) {
    return (0, _isTypeFn.isNotEmptyArr)(legend) ? this.add('zhConfig', {
      legend
    }) : this;
  },
  addMinMax(data, option) {
    const {
        isNotZoomToMinMax,
        isDrawDeltaExtrems,
        isFilterZero,
        isLogarithmic,
        minY,
        maxY
      } = option,
      _data = isFilterZero ? (0, _seriaFn.filterTrimZero)(data) : data,
      min = _findMinY(minY, _data),
      max = _findMaxY(maxY, _data);
    return this._setMinMax(min, max, isNotZoomToMinMax)._setMinMaxDeltas(min, max, _data, isDrawDeltaExtrems)._setYAxisType(isLogarithmic, _data);
  },
  _setMinMaxDeltas(min, max, data, isDrawDeltaExtrems) {
    if (isDrawDeltaExtrems) {
      const _recentIndex = data.length - 1;
      if (_recentIndex > 0) {
        (0, _ChartFn.setPlotLinesDeltas)({
          plotLines: this.config.yAxis.plotLines,
          min,
          max,
          value: _getY(data[_recentIndex])
        });
      }
    }
    return this;
  },
  _setMinMax(min, max, noZoom) {
    (0, _ChartFn.setPlotLinesMinMax)({
      plotLines: this.config.yAxis.plotLines,
      min,
      max
    });
    return this.add('yAxis', {
      min: _calcYAxisMin(min, max, noZoom),
      maxPadding: 0.15,
      minPadding: 0.15,
      endOnTick: false,
      startOnTick: false
    });
  },
  _setYAxisType(isLogarithmic, data) {
    if (isLogarithmic) {
      if (!(0, _ChartConfigFn.isLineType)(this.config) || (0, _seriaFn.hasZeroOrLessValue)(data)) {
        return this;
      }
      const {
        yAxis
      } = this.config;
      yAxis.type = 'logarithmic';
      //yAxis.minorTickInterval = 0.1
      if (yAxis.min <= 0) {
        yAxis.min = null;
      }
    }
    return this;
  },
  _addScatterBottom(seria, name, min, max) {
    const {
      data
    } = seria;
    if (data.length > 0) {
      const {
        series,
        chart,
        zhConfig
      } = this.config;
      (0, _ChartFn.setYToPoints)(data, (0, _ChartFn.calcMinY)(min, max));
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
  _disableAnimation() {
    this.add({
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
  _checkDataLength() {
    const data = _getData(this);
    if (data.length > 3000) {
      this._disableAnimation();
    }
  },
  toConfig() {
    this._checkDataLength();
    return this.config;
  }
});
var _default = ConfigBuilder;
exports.default = _default;
//# sourceMappingURL=ConfigBuilder.js.map