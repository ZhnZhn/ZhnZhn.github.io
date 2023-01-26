"use strict";

exports.__esModule = true;
exports.default = void 0;
var _Chart = require("./Chart");
var _ChartTheme = require("./ChartTheme");
var _ChartConfigFn = require("./ChartConfigFn");
var _TreeMapConfigFn = require("./TreeMapConfigFn");
var _seriaBuilderHelpers = require("./seriaBuilderHelpers");
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
const _isArr = Array.isArray,
  _assign = Object.assign;
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
    if (this.config.series[index]) {
      _assign(this.config.series[index], obj);
    } else {
      this.config.series.push(obj);
    }
    return this;
  },
  addSeriaTo(index, seria) {
    this.config.series[index] = seria;
    return this;
  },
  _addSeriaPoints(points, _temp) {
    let {
      maxVisible = 6
    } = _temp === void 0 ? {} : _temp;
    const _legend = [];
    points.forEach((data, index) => {
      const is = index < maxVisible ? true : false,
        color = (0, _ChartTheme.getSeriaColorByIndex)(index),
        {
          seriaName
        } = data;
      _legend.push((0, _seriaBuilderHelpers.crLegendItem)({
        index,
        color,
        name: seriaName,
        is
      }));
      this.addSeriaBy(index, {
        type: 'spline',
        data: data,
        name: seriaName,
        zhValueText: seriaName,
        visible: is
      });
    });
    if (_legend.length !== 0) {
      this.addLegend(_legend);
    }
    return this;
  },
  _addPointsToConfig(points) {
    if (points[0] && _isArr(points[0]) && points[0][0] && typeof points[0][0] !== 'number') {
      this._addSeriaPoints(points);
    } else {
      this.addSeriaBy(0, {
        type: 'spline',
        data: points
      });
    }
  },
  addPoints(id, points, text) {
    if (this._type !== 'S') {
      this._addPointsToConfig(points);
    } else {
      this.add({
        data: points,
        zhValueText: text ? text : id
      });
    }
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