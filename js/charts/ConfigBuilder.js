"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ChartConfigFn = require("./ChartConfigFn");
var _SeriaBuilder = _interopRequireDefault(require("./SeriaBuilder"));
var _ConfigStockSlice = _interopRequireDefault(require("./ConfigStockSlice"));
var _configBuilderFn = require("./configBuilderFn");
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
ConfigBuilder.crSeria = _configBuilderFn.crSeriaConfigFromAdapter;
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
  treeMapConfig(data) {
    this.config = (0, _configBuilderFn.crTreeMapConfig)(data);
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