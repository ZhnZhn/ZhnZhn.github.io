'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _seriaFn = require('../math/seriaFn');

var _seriaFn2 = _interopRequireDefault(_seriaFn);

var _Chart = require('./Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _ChartFn = require('./ChartFn');

var _ChartFn2 = _interopRequireDefault(_ChartFn);

var _ChartConfig = require('./ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

var _ChartFactory = require('./ChartFactory');

var _ChartFactory2 = _interopRequireDefault(_ChartFactory);

var _Tooltip = require('./Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _SeriaBuilder = require('./SeriaBuilder');

var _SeriaBuilder2 = _interopRequireDefault(_SeriaBuilder);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var findMinY = _seriaFn2.default.findMinY,
    findMaxY = _seriaFn2.default.findMaxY;
var setPlotLinesMinMax = _ChartFn2.default.setPlotLinesMinMax,
    setPlotLinesDeltas = _ChartFn2.default.setPlotLinesDeltas,
    calcMinY = _ChartFn2.default.calcMinY,
    setYToPoints = _ChartFn2.default.setYToPoints;
var crDividendSeria = _ChartConfig2.default.crDividendSeria;


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
//const _isArr = Array.isArray;

var _isObj = function _isObj(obj) {
  return obj && (typeof obj === 'undefined' ? 'undefined' : (0, _typeof3.default)(obj)) === 'object';
};
var _isStr = function _isStr(str) {
  return typeof str === 'string';
};
var _isNumber = function _isNumber(n) {
  return typeof n === 'number' && n - n === 0;
};

var _getY = function _getY(point) {
  return Array.isArray(point) ? point[1] : point && point.y || 0;
};

var ConfigBuilder = function ConfigBuilder() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!(this instanceof ConfigBuilder)) {
    return new ConfigBuilder(config);
  }
  this.config = config;
};

ConfigBuilder.prototype = _assign(ConfigBuilder.prototype, (0, _extends3.default)({}, _SeriaBuilder2.default, {
  init: function init() {
    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    this.config = config;
    return this;
  },
  areaConfig: function areaConfig(option) {
    this.config = _ChartConfig2.default.fBaseAreaConfig(option);
    return this;
  },
  area2Config: function area2Config(title, subtitle) {
    this.areaConfig({ spacingTop: 25 }).addCaption(title, subtitle).clearSeries();
    return this;
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

    this.areaConfig({ spacingTop: 25 }).addTooltip(_Tooltip2.default.fnBasePointFormatter).addMiniVolume({
      id: id,
      dColumn: dataVolumeColumn,
      dVolume: dataVolume
    }).addMiniATH({
      id: id, data: dataATH
    }).setMinMax(minClose, maxClose, isNotZoomToMinMax).setMinMaxDeltas(minClose, maxClose, data, isDrawDeltaExtrems).setStockSerias(id, data, dataHigh, dataLow, dataOpen);
    return this;
  },
  categoryConfig: function categoryConfig() {
    var categories = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    this.config = _ChartConfig2.default.fBaseAreaConfig();
    var xAxis = (0, _extends3.default)({}, C.CATEGORIES_X_AXIS, { categories: categories });
    this.add('xAxis', xAxis);
    this.add('yAxis', C.CATEGORIES_Y_AXIS);
    return this;
  },
  _columnConfig: function _columnConfig() {
    var categories = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var option = arguments[1];

    this.config = _ChartFactory2.default.crColumnConfig(option);
    this.add('xAxis', { categories: categories });
    return this;
  },
  _barConfig: function _barConfig() {
    var categories = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var option = arguments[1];

    this.config = _ChartFactory2.default.crBarConfig(option);
    this.add('xAxis', { categories: categories });
    return this;
  },
  barOrColumnConfig: function barOrColumnConfig(type) {
    var categories = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var option = arguments[2];

    if (type === 'BAR') {
      return this._barConfig(categories, option);
    }
    return this._columnConfig(categories, option);
  },
  treeMapConfig: function treeMapConfig() {
    this.config = _ChartConfig2.default.fBaseTreeMapConfig();
    return this;
  },
  alignButtonExport: function alignButtonExport() {
    _assign(this.config.navigation.buttonOptions, { x: -10, y: -20 });
    return this;
  },
  addTitle: function addTitle(title) {
    var _to = this.config.title || {};
    this.config.title = _assign(_to, _Chart2.default.fTitle({
      text: title,
      y: _Chart2.default.STACKED_TITLE_Y
    }));
    return this;
  },
  addSubtitle: function addSubtitle(subtitle) {
    var _to = this.config.subtitle || {};
    this.config.subtitle = _assign(_to, _Chart2.default.fSubtitle({
      text: subtitle,
      y: _Chart2.default.STACKED_SUBTITLE_Y
    }));
    return this;
  },
  addCaption: function addCaption() {
    var title = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var subtitle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

    return this.addTitle(title).addSubtitle(subtitle);
  },
  addTooltip: function addTooltip(tooltip) {
    this.config.tooltip = _Chart2.default.fTooltip(tooltip);
    return this;
  },
  addXAxisCrosshair: function addXAxisCrosshair() {
    this.add('xAxis', { crosshair: _Chart2.default.fCrosshair() });
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
      var _propName = void 0;
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

    return dVolume && dVolume.length > 0 ? this.addZhMiniConfig(_ChartConfig2.default.fMiniVolumeConfig(option)) : this;
  },
  addMiniATH: function addMiniATH(option) {
    var data = option.data;

    return data && data.length > 0 ? this.addZhMiniConfig(_ChartConfig2.default.fMiniATHConfig(option)) : this;
  },
  addMiniHL: function addMiniHL(option) {
    var data = option.data;

    return data && data.length > 0 ? this.addZhMiniConfig(_ChartConfig2.default.fMiniHLConfig(option)) : this;
  },
  addZhPoints: function addZhPoints(data, fn) {
    this.add({
      zhPoints: data,
      zhIsMfi: true
      //zhFnGetMfiConfig: fn
    });
    return this;
  },
  addLegend: function addLegend(legend) {
    return this.add('zhConfig', {
      legend: legend, isWithLegend: true
    });
  },
  addMinMax: function addMinMax(data, option) {
    var isNotZoomToMinMax = option.isNotZoomToMinMax,
        isDrawDeltaExtrems = option.isDrawDeltaExtrems,
        minY = option.minY,
        maxY = option.maxY,
        min = _isNumber(minY) ? minY : findMinY(data),
        max = _isNumber(maxY) ? maxY : findMaxY(data);

    return this.setMinMax(min, max, isNotZoomToMinMax).setMinMaxDeltas(min, max, data, isDrawDeltaExtrems);
  },
  setMinMaxDeltas: function setMinMaxDeltas(min, max, data, isDrawDeltaExtrems) {
    if (isDrawDeltaExtrems) {
      var _recentIndex = data.length - 1;
      if (_recentIndex > 0) {
        setPlotLinesDeltas({
          plotLines: this.config.yAxis.plotLines,
          min: min, max: max,
          value: _getY(data[_recentIndex])
        });
      }
    }
    return this;
  },
  _setYAxisMin: function _setYAxisMin(min, max, noZoom) {
    var _min = noZoom && min > 0 ? 0 : _Chart2.default.calcMinY({
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
      min: min, max: max
    });
    this._setYAxisMin(min, max, noZoom);
    return this;
  },
  setStockSerias: function setStockSerias(id, d, dH, dL, dO) {
    _ChartConfig2.default.setStockSerias(this.config, d, dH, d, dO, id);
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

  addDividend: function addDividend(_ref) {
    var dataDividend = _ref.dataDividend,
        minClose = _ref.minClose,
        maxClose = _ref.maxClose;

    if (dataDividend.length > 0) {
      setYToPoints(dataDividend, calcMinY({ min: minClose, max: maxClose }));
      this.config.series.push(crDividendSeria(dataDividend, 'exDividend'));
      this.config.chart.spacingBottom = 40;
    }
    return this;
  },
  toConfig: function toConfig() {
    return this.config;
  }
}));

exports.default = ConfigBuilder;
//# sourceMappingURL=ConfigBuilder.js.map