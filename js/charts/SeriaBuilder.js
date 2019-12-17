"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _Chart = _interopRequireDefault(require("./Chart"));

var _ChartConfig = _interopRequireDefault(require("./ChartConfig"));

var C = {
  SPLINE: {
    type: 'spline',
    visible: true,
    marker: {
      symbol: 'circle'
    }
  },
  AREA_RANGE: {
    type: 'arearange',
    color: '#7cb5ec',
    fillColor: {
      linearGradient: {
        x1: 0,
        x2: 0,
        y1: 0,
        y2: 1
      },
      stops: [[0, "rgba(69, 114, 167, 1)"], [1, "rgba(2, 0, 0, 0)"]]
    },
    marker: {
      radius: 0
    }
  },
  TREE_MAP: {
    //zhSeriaId : zhSeriaId,
    type: 'treemap',
    layoutAlgorithm: 'squarified',
    //layoutAlgorithm : 'sliceAndDice',
    borderColor: 'gray',
    dataLabels: {
      align: 'left',
      verticalAlign: 'top',
      style: {
        fontFamily: '"Roboto", "Arial", "Lato", sans-serif',
        fontSize: '14px',
        fontWeight: 'bold',
        color: 'black',
        textShadow: 'none'
      }
    },
    //data : data,
    states: {
      hover: {
        borderColor: 'yellow',
        brightness: 0
      }
    }
  },
  SCATTER: {
    type: 'scatter'
  }
};
var _isArr = Array.isArray;

var _isObj = function _isObj(obj) {
  return obj && typeof obj === 'object';
};

var _crLegendItem = function _crLegendItem(_ref) {
  var index = _ref.index,
      color = _ref.color,
      name = _ref.name,
      _ref$is = _ref.is,
      is = _ref$is === void 0 ? false : _ref$is;
  return {
    index: index,
    color: color,
    name: name,
    isVisible: is
  };
};

var _addSeriesImpl = function _addSeriesImpl(to, series) {
  var _legend = [];
  series.forEach(function (seria, index) {
    var color = seria.color,
        _seria$zhValueText = seria.zhValueText,
        zhValueText = _seria$zhValueText === void 0 ? '' : _seria$zhValueText,
        visible = seria.visible;
    to.push(seria);

    _legend.push(_crLegendItem({
      index: index,
      color: color,
      name: zhValueText,
      is: visible
    }));
  });
  return _legend;
};

var SeriaBuilder = {
  initSeria: function initSeria(option) {
    this._type = 'S';
    this.config = Object.assign(_ChartConfig["default"].fSeries(), option);
    return this;
  },
  splineSeria: function splineSeria(option) {
    return this.initSeria((0, _extends2["default"])({}, C.SPLINE, {}, option));
  },
  _seria: function _seria(CONFIG, tooltip, option) {
    this._type = 'S';
    this.config = (0, _extends2["default"])({}, CONFIG, {}, option);
    this.add('tooltip', _Chart["default"].fTooltip(tooltip));
    return this;
  },
  areaRangeSeria: function areaRangeSeria(tooltip, option) {
    return this._seria(C.AREA_RANGE, tooltip, option);
  },
  treeMapSeria: function treeMapSeria(tooltip, option) {
    return this._seria(C.TREE_MAP, tooltip, option);
  },
  scatterSeria: function scatterSeria(tooltip, option) {
    return this._seria(C.SCATTER, tooltip, option);
  },
  addSeriaBy: function addSeriaBy(index, obj) {
    if (this.config.series[index]) {
      Object.assign(this.config.series[index], obj);
    } else {
      this.config.series.push(obj);
    }

    return this;
  },
  addSeriaTo: function addSeriaTo(index, seria) {
    this.config.series[index] = seria;
    return this;
  },
  addSeriaPoints: function addSeriaPoints(id, points, _temp) {
    var _this = this;

    var _ref2 = _temp === void 0 ? {} : _temp,
        _ref2$maxVisible = _ref2.maxVisible,
        maxVisible = _ref2$maxVisible === void 0 ? 6 : _ref2$maxVisible,
        _ref2$isWithLegend = _ref2.isWithLegend,
        isWithLegend = _ref2$isWithLegend === void 0 ? false : _ref2$isWithLegend;

    var _legend = [];
    points.forEach(function (data, index) {
      var is = index < maxVisible ? true : false,
          color = _ChartConfig["default"].getColor(index),
          seriaName = data.seriaName;

      _legend.push(_crLegendItem({
        index: index,
        color: color,
        name: seriaName,
        is: is
      }));

      _this.addSeriaBy(index, {
        type: 'spline',
        data: data,
        name: seriaName,
        zhValueText: seriaName,
        zhSeriaId: id + '_' + index,
        visible: is
      });
    });

    if (!isWithLegend) {
      this.addLegend(_legend);
    }

    return this;
  },
  _addPointsToConfig: function _addPointsToConfig(id, points) {
    if (points[0] && _isArr(points[0]) && points[0][0] && typeof points[0][0] !== 'number') {
      this.addSeriaPoints(id, points);
    } else {
      this.addSeriaBy(0, {
        type: 'spline',
        data: points,
        zhSeriaId: id
      });
    }
  },
  addPoints: function addPoints(id, points, text) {
    if (this._type !== 'S') {
      this._addPointsToConfig(id, points);
    } else {
      this.add({
        data: points,
        zhSeriaId: id,
        zhValueText: text ? text : id
      });
    }

    return this;
  },
  clearSeries: function clearSeries() {
    this.config.series = [];
    return this;
  },
  addSeries: function addSeries(series, isWithoutLegend) {
    if (isWithoutLegend === void 0) {
      isWithoutLegend = false;
    }

    var _to = _isArr(this.config.series) ? this.config.series : this.config.series = [];

    if (_isArr(series)) {
      var _legend = _addSeriesImpl(_to, series);

      if (!isWithoutLegend) {
        this.addLegend(_legend);
      }
    } else if (_isObj(series)) {
      _to[0] = series;
    }

    return this;
  },
  toSeria: function toSeria() {
    return this.config;
  }
};
var _default = SeriaBuilder;
exports["default"] = _default;
//# sourceMappingURL=SeriaBuilder.js.map