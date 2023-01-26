"use strict";

exports.__esModule = true;
exports.default = void 0;
var _Chart = require("./Chart");
var _ChartConfigFn = require("./ChartConfigFn");
var _TreeMapConfigFn = require("./TreeMapConfigFn");
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
  initSeria(option) {
    this._type = 'S';
    this.config = (0, _ChartConfigFn.crSeriaConfig)(option);
    return this;
  },
  splineSeria(option) {
    return this.initSeria({
      ...CONFIG_SERIA,
      ...option
    });
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
  treeMapSeria(tooltip, option) {
    return this._seria(_TreeMapConfigFn.CONFIG_TREE_MAP, tooltip, option);
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
  //INSEE
  addPoints(id, points, text) {
    this.add({
      data: points,
      zhValueText: text ? text : id
    });
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