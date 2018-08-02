'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _highcharts = require('highcharts');

var _highcharts2 = _interopRequireDefault(_highcharts);

var _formatNumber = require('../utils/formatNumber');

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _calcDeltaYAxis = require('./calcDeltaYAxis');

var _calcDeltaYAxis2 = _interopRequireDefault(_calcDeltaYAxis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C = {
  DATE_PATTERN: '%d-%m-%Y',
  DATE_EMPTY: '01-01-1970',

  ATTR_LABEL: {
    zIndex: 100
  },
  CSS_LABEL: {
    //color: '#f1d600',
    color: 'black',
    fontWeight: 'bold',
    fontSize: '14px'
  },

  CL_DY: -1,

  DX_CATEGORY: 40,
  DY_CATEGORY: 32,

  DX_DELTA_Y_AXIS: 10
};

var _crCrossParam = function _crCrossParam(point, chart) {
  var _d = _highcharts2.default.dateFormat(C.DATE_PATTERN, point.x);
  return {
    y: point.y,
    date: _d !== C.DATE_EMPTY ? _d : '',
    dX: chart.options.chart.xDeltaCrossLabel,
    dY: chart.options.chart.yDeltaCrossLabel
  };
};

var _crCategoryCrossParam = function _crCategoryCrossParam(point, chart) {
  return {
    y: (0, _formatNumber2.default)(point.y),
    date: point.x,
    dX: chart.options.chart.xDeltaCrossLabel - C.DX_CATEGORY,
    dY: chart.options.chart.yDeltaCrossLabel - C.DY_CATEGORY
  };
};

var _crYCrossLabelX = function _crYCrossLabelX(chart, dX) {
  return chart.yAxis[0].width + chart.plotLeft + dX;
};
var _crYCrossLabelY = function _crYCrossLabelY(chart, plotY) {
  return plotY + chart.plotTop + C.CL_DY;
};

var handleMouserOverPoint = function handleMouserOverPoint(event) {
  var isCategory = this.isCategory,
      c = this.c,
      plotX = this.plotX,
      plotY = this.plotY,
      series = this.series,
      chart = series.chart,
      xCrossLabel = chart.xCrossLabel,
      yCrossLabel = chart.yCrossLabel,
      _ref = !isCategory || c ? _crCrossParam(this, chart) : _crCategoryCrossParam(this, chart),
      y = _ref.y,
      date = _ref.date,
      dX = _ref.dX,
      dY = _ref.dY,
      deltaYAxis = (0, _calcDeltaYAxis2.default)(chart),
      xLX = deltaYAxis ? plotX + deltaYAxis - C.DX_DELTA_Y_AXIS : plotX,
      xLY = _crYCrossLabelX(chart, dX),
      yLY = _crYCrossLabelY(chart, plotY);

  if (xCrossLabel) {
    xCrossLabel.attr({ x: xLX, text: date });
    yCrossLabel.attr({ x: xLY, y: yLY, text: y });
  } else {
    chart.xCrossLabel = chart.renderer.text(date, xLX, chart.plotTop - dY).attr(C.ATTR_LABEL).css(C.CSS_LABEL).add();
    chart.yCrossLabel = chart.renderer.text(y, xLY, yLY).attr(C.ATTR_LABEL).css(C.CSS_LABEL).add();
  }
};

exports.default = handleMouserOverPoint;
//# sourceMappingURL=handleMouseOver.js.map