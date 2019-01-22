'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

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
var setPlotLinesMinMax = _ChartFn2.default.setPlotLinesMinMax;


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

var ConfigBuilder = function ConfigBuilder() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (!(this instanceof ConfigBuilder)) {
    return new ConfigBuilder(config);
  }
  this.config = config;
};

ConfigBuilder.prototype = Object.assign(ConfigBuilder.prototype, (0, _extends3.default)({}, _SeriaBuilder2.default, {
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
    }).setMinMax(minClose, maxClose, isNotZoomToMinMax).setStockSerias(id, data, dataHigh, dataLow, dataOpen);
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
    Object.assign(this.config.navigation.buttonOptions, { x: -10, y: -20 });
    return this;
  },
  addTitle: function addTitle(title) {
    var _to = this.config.title || {};
    this.config.title = Object.assign(_to, _Chart2.default.fTitle({
      text: title,
      y: _Chart2.default.STACKED_TITLE_Y
    }));
    return this;
  },
  addSubtitle: function addSubtitle(subtitle) {
    var _to = this.config.subtitle || {};
    this.config.subtitle = Object.assign(_to, _Chart2.default.fSubtitle({
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
    if (typeof propName === 'string') {
      var _to = this.config[propName];
      if (_to && (typeof _to === 'undefined' ? 'undefined' : (0, _typeof3.default)(_to)) === 'object') {
        Object.assign(this.config[propName], option);
      } else {
        this.config[propName] = option;
      }
    } else if (propName && (typeof propName === 'undefined' ? 'undefined' : (0, _typeof3.default)(propName)) === 'object') {
      var _propName = void 0;
      for (_propName in propName) {
        var _to2 = this.config[_propName],
            _from = propName[_propName];
        if (_to2) {
          Object.assign(_to2, _from);
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
    return this.setMinMax(findMinY(data), findMaxY(data), option.isNotZoomToMinMax);
  },
  setMinMax: function setMinMax(min, max, noZoom) {
    var plotLines = this.config.yAxis.plotLines;
    setPlotLinesMinMax({ plotLines: plotLines, min: min, max: max });

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

    return this;
  },
  setStockSerias: function setStockSerias(id, d, dH, dL, dO) {
    _ChartConfig2.default.setStockSerias(this.config, d, dH, d, dO, id);
    return this;
  },
  toConfig: function toConfig() {
    return this.config;
  }
}));

exports.default = ConfigBuilder;
//# sourceMappingURL=ConfigBuilder.js.map