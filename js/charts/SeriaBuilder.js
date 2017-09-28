'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ChartConfig = require('./ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C = {
  TYPE_A: 'A',
  TYPE_B: 'B'
};

var _crLegendItem = function _crLegendItem(index, color, name) {
  var is = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  return {
    index: index, color: color, name: name,
    isVisible: is
  };
};

var SeriaBuilder = {
  initBaseSeria: function initBaseSeria() {
    this.config = _ChartConfig2.default.fSeries();
    return this;
  },
  addSeriaBy: function addSeriaBy(index, obj) {
    if (this.config.series[index]) {
      Object.assign(this.config.series[index], obj);
    } else {
      this.config.series.push(obj);
    }
    return this;
  },
  addSeriesWithLegend: function addSeriesWithLegend(id, points) {
    var _this = this;

    var maxVisible = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 6;

    var _legend = [];
    points.forEach(function (data, i) {
      var _isShow = i < maxVisible ? true : false,
          _color = _ChartConfig2.default.getColor(i),
          seriaName = data.seriaName;

      _legend.push(_crLegendItem(i, _color, seriaName, _isShow));
      _this.addSeriaBy(i, {
        type: 'spline',
        data: data,
        name: seriaName,
        zhValueText: seriaName,
        zhSeriaId: id + '_' + i,
        visible: _isShow
      });
    });
    return this.add('zhConfig', {
      isWithLegend: true,
      legend: _legend
    });
  },
  addPoints: function addPoints(id, _ref) {
    var type = _ref.type,
        points = _ref.points;

    switch (type) {
      case C.TYPE_A:
        return this.addSeriaBy(0, {
          type: 'spline',
          data: points,
          zhSeriaId: id
        });
      case C.TYPE_B:
        return this.addSeriesWithLegend(id, points);
      default:
        return this;
    }
  }
};

exports.default = SeriaBuilder;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\charts\SeriaBuilder.js.map