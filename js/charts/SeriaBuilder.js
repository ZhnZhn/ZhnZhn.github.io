'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require('babel-runtime/helpers/typeof');

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _Chart = require('./Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _ChartConfig = require('./ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C = {
  BASE_AREA_RANGE: {
    type: 'arearange',
    color: '#7cb5ec',
    fillColor: {
      linearGradient: { x1: 0, x2: 0, y1: 0, y2: 1 },
      stops: [[0, "rgba(69, 114, 167, 1)"], [1, "rgba(2, 0, 0, 0)"]]
    },
    marker: {
      radius: 0
    }
  },
  BASE_TREE_MAP: {
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
  }
};

var _crLegendItem = function _crLegendItem(_ref) {
  var index = _ref.index,
      color = _ref.color,
      name = _ref.name,
      _ref$is = _ref.is,
      is = _ref$is === undefined ? false : _ref$is;
  return {
    index: index, color: color, name: name,
    isVisible: is
  };
};

var _addSeriesImpl = function _addSeriesImpl(to, series) {
  var _legend = [];
  series.forEach(function (seria, index) {
    var color = seria.color,
        _seria$zhValueText = seria.zhValueText,
        zhValueText = _seria$zhValueText === undefined ? '' : _seria$zhValueText,
        visible = seria.visible;

    to.push(seria);
    _legend.push(_crLegendItem({
      index: index, color: color, name: zhValueText, is: visible
    }));
  });
  return _legend;
};

var SeriaBuilder = {
  initBaseSeria: function initBaseSeria() {
    this._type = 'S';
    this.config = _ChartConfig2.default.fSeries();
    return this;
  },
  _initBaseSeria: function _initBaseSeria(BASE, tooltip, option) {
    this._type = 'S';
    this.config = (0, _extends3.default)({}, BASE, option);
    this.add('tooltip', _Chart2.default.fTooltip(tooltip));
    return this;
  },
  initAreaRange: function initAreaRange(tooltip, option) {
    return this._initBaseSeria(C.BASE_AREA_RANGE, tooltip, option);
  },
  initTreeMap: function initTreeMap(tooltip, option) {
    return this._initBaseSeria(C.BASE_TREE_MAP, tooltip, option);
  },
  addLegend: function addLegend(legend) {
    return this.add('zhConfig', {
      legend: legend, isWithLegend: true
    });
  },
  addSeriaBy: function addSeriaBy(index, obj) {
    if (this.config.series[index]) {
      Object.assign(this.config.series[index], obj);
    } else {
      this.config.series.push(obj);
    }
    return this;
  },
  addSeriaPoints: function addSeriaPoints(id, points) {
    var _this = this;

    var _ref2 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref2$maxVisible = _ref2.maxVisible,
        maxVisible = _ref2$maxVisible === undefined ? 6 : _ref2$maxVisible,
        _ref2$isWithLegend = _ref2.isWithLegend,
        isWithLegend = _ref2$isWithLegend === undefined ? false : _ref2$isWithLegend;

    var _legend = [];
    points.forEach(function (data, index) {
      var is = index < maxVisible ? true : false,
          color = _ChartConfig2.default.getColor(index),
          seriaName = data.seriaName;

      _legend.push(_crLegendItem({
        index: index, color: color, name: seriaName, is: is
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
    if (points[0] && Array.isArray(points[0]) && points[0][0] && typeof points[0][0] !== 'number') {
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
  addSeries: function addSeries(series) {
    var isWithoutLegend = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var _to = Array.isArray(this.config.series) ? this.config.series : this.config.series = [];
    if (Array.isArray(series)) {
      var _legend = _addSeriesImpl(_to, series);
      if (!isWithoutLegend) {
        this.addLegend(_legend);
      }
    } else if ((typeof series === 'undefined' ? 'undefined' : (0, _typeof3.default)(series)) === 'object') {
      _to[0] = series;
    }
    return this;
  }
};

exports.default = SeriaBuilder;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\charts\SeriaBuilder.js.map