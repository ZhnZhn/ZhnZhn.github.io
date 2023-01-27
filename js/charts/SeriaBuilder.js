"use strict";

exports.__esModule = true;
exports.default = void 0;
var _Chart = require("./Chart");
var _ChartConfigFn = require("./ChartConfigFn");
var _configBuilderFn = require("./configBuilderFn");
const CONFIG_SERIA = {
    //type: 'spline',
    visible: true,
    marker: {
      symbol: 'circle'
    }
  },
  CONFIG_SCATTER = {
    type: 'scatter'
  };
const SeriaBuilder = {
  splineSeria(option) {
    this._type = 'S';
    this.config = (0, _ChartConfigFn.crSeriaConfig)({
      ...CONFIG_SERIA,
      ...option
    });
    return this;
  },
  _seria(CONFIG, tooltip, option) {
    this._type = 'S';
    this.config = {
      ...CONFIG,
      ...option
    };
    this.add('tooltip', (0, _Chart.fTooltip)(tooltip));
    return this;
  },
  scatterSeria(tooltip, option) {
    return this._seria(CONFIG_SCATTER, tooltip, option);
  },
  addSeriaBy(index, obj) {
    (0, _configBuilderFn.fAddSeriaBy)(index, obj)(this.config);
    return this;
  },
  addSeriaTo(index, seria) {
    this.config.series[index] = seria;
    return this;
  },
  addSeries(series, isWithoutLegend) {
    if (isWithoutLegend === void 0) {
      isWithoutLegend = false;
    }
    (0, _configBuilderFn.fAddSeries)(series, isWithoutLegend)(this.config);
    return this;
  },
  toSeria() {
    return this.config;
  }
};
var _default = SeriaBuilder;
exports.default = _default;
//# sourceMappingURL=SeriaBuilder.js.map