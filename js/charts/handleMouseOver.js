"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _formatNumber = _interopRequireDefault(require("../utils/formatNumber"));

var _dateFormat = _interopRequireDefault(require("./dateFormat"));

var _calcDeltaYAxis = _interopRequireDefault(require("./calcDeltaYAxis"));

var formatDate = _dateFormat["default"].formatDate;
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
  CL_DX: -4,
  CL_DY: -1,
  DX_CATEGORY: 40,
  DY_CATEGORY: 32,
  DX_DELTA_Y_AXIS: 10
};

var _crDelta = function _crDelta(chart, dX, dY) {
  if (dX === void 0) {
    dX = 0;
  }

  if (dY === void 0) {
    dY = 0;
  }

  var _chart$options$chart = chart.options.chart,
      _chart$options$chart$ = _chart$options$chart.xDeltaCrossLabel,
      xDeltaCrossLabel = _chart$options$chart$ === void 0 ? 0 : _chart$options$chart$,
      _chart$options$chart$2 = _chart$options$chart.yDeltaCrossLabel,
      yDeltaCrossLabel = _chart$options$chart$2 === void 0 ? 0 : _chart$options$chart$2;
  return {
    dX: xDeltaCrossLabel - dX,
    dY: yDeltaCrossLabel - dY
  };
};

var _crCrossParam = function _crCrossParam(point, chart) {
  var _d = formatDate(C.DATE_PATTERN, point.x);

  return (0, _extends2["default"])({
    y: point.y,
    date: _d !== C.DATE_EMPTY ? _d : ''
  }, _crDelta(chart));
};

var _crCategoryCrossParam = function _crCategoryCrossParam(point, chart) {
  return (0, _extends2["default"])({
    y: (0, _formatNumber["default"])(point.y),
    date: point.x
  }, _crDelta(chart, C.DX_CATEGORY, C.DY_CATEGORY));
};

var _crYCrossLabelX = function _crYCrossLabelX(chart, dX) {
  return chart.yAxis[0].width + chart.plotLeft + dX + C.CL_DX;
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
      deltaYAxis = (0, _calcDeltaYAxis["default"])(chart),
      xLX = deltaYAxis ? plotX + deltaYAxis - C.DX_DELTA_Y_AXIS : plotX,
      xLY = _crYCrossLabelX(chart, dX),
      yLY = _crYCrossLabelY(chart, plotY);

  if (xCrossLabel) {
    xCrossLabel.attr({
      x: xLX,
      text: date
    });
    yCrossLabel.attr({
      x: xLY,
      y: yLY,
      text: y
    });
  } else {
    chart.xCrossLabel = chart.renderer.text(date, xLX, chart.plotTop - dY).attr(C.ATTR_LABEL).css(C.CSS_LABEL).add();
    chart.yCrossLabel = chart.renderer.text(y, xLY, yLY).attr(C.ATTR_LABEL).css(C.CSS_LABEL).add();
  }
};

var _default = handleMouserOverPoint;
exports["default"] = _default;
//# sourceMappingURL=handleMouseOver.js.map