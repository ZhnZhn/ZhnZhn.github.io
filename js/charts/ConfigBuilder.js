"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _seriaFn = require("../math/seriaFn");
var _Chart = require("./Chart");
var _Tooltip = require("./Tooltip");
var _ChartConfigFn = require("./ChartConfigFn");
var _TreeMapConfigFn = require("./TreeMapConfigFn");
var _ChartFactory = require("./ChartFactory");
var _SeriaBuilder = _interopRequireDefault(require("./SeriaBuilder"));
var _ConfigStockSlice = _interopRequireDefault(require("./ConfigStockSlice"));
var _configBuilderFn = require("./configBuilderFn");
var _configBuilderHelpers = require("./configBuilderHelpers");
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
const _assign = Object.assign;
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
    this.config = (0, _configBuilderFn.crArea2Config)(title, subtitle);
    return this;
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
    (0, _configBuilderHelpers.assignTo)(this.config, 'title', (0, _Chart.fTitle)({
      text
    }));
    return this;
  },
  addSubtitle(text) {
    (0, _configBuilderHelpers.assignTo)(this.config, 'subtitle', (0, _Chart.fSubtitle)({
      text
    }));
    return this;
  },
  addCaption(title, subtitle) {
    (0, _configBuilderFn.fAddCaption)(title, subtitle)(this.config);
    return this;
  },
  addTooltip(tooltip) {
    (0, _configBuilderFn.fAddTooltip)(tooltip)(this.config);
    return this;
  },
  add(propName, option) {
    (0, _configBuilderFn.fAdd)(propName, option)(this.config);
    return this;
  },
  _addMini(data, option, crConfig) {
    (0, _configBuilderFn._addMini)(data, option, crConfig, this.config);
    return this;
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
    (0, _configBuilderFn.fAddLegend)(legend)(this.config);
    return this;
  },
  addMinMax(data, option) {
    (0, _configBuilderFn.fAddMinMax)(data, option)(this.config);
    return this;
  },
  toConfig() {
    return (0, _configBuilderFn.toConfig)(this.config);
  }
});
var _default = ConfigBuilder;
exports.default = _default;
//# sourceMappingURL=ConfigBuilder.js.map