"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _dateFormatFn = require("../utils/dateFormatFn");
var _numberFormatFn = require("../utils/numberFormatFn");
var _calcYAxisOffset = _interopRequireDefault(require("./calcYAxisOffset"));
var _CL = require("./CL");
const ATTR_LABEL = {
    zIndex: 100
  },
  X_DX = -10,
  X_DY = 1,
  Y_DX = -4,
  Y_DY = -1,
  DX_CATEGORY = 40,
  DY_CATEGORY = 32;
const _crDelta = function (chart, dX, dY) {
  if (dX === void 0) {
    dX = 0;
  }
  if (dY === void 0) {
    dY = 0;
  }
  const {
    xDeltaCrossLabel = 0,
    yDeltaCrossLabel = 0
  } = chart.options.chart;
  return {
    dX: xDeltaCrossLabel - dX,
    dY: yDeltaCrossLabel - dY
  };
};
const _crCrossParam = (point, chart) => ({
  y: point.y,
  date: (0, _dateFormatFn.toDmy)(point.x),
  ..._crDelta(chart)
});
const _crCategoryCrossParam = (point, chart) => ({
  y: (0, _numberFormatFn.formatNumber)(point.y),
  date: point.x,
  ..._crDelta(chart, DX_CATEGORY, DY_CATEGORY)
});
const _isCrossParam = point => !point.isCategory || point.c;
const _getCrCrossParam = point => _isCrossParam(point) ? _crCrossParam : _crCategoryCrossParam;
const _crXCrossLabelX = (chart, plotX) => {
  const _yAxisOffset = (0, _calcYAxisOffset.default)(chart);
  return _yAxisOffset ? plotX + _yAxisOffset + X_DX : plotX;
};
const _crXCrossLabelY = (chart, dY) => chart.plotTop - dY + X_DY;
const _crYCrossLabelX = (chart, dX) => chart.yAxis[0].width + chart.plotLeft + dX + Y_DX;
const _crYCrossLabelY = (chart, plotY) => plotY + chart.plotTop + Y_DY;
const _crCrossLabel = (chart, text, x, y) => chart.renderer.text(text, x, y).attr(ATTR_LABEL).addClass(_CL.CL_HC_GL).add();
const handleMouserOverPoint = function (event) {
  const {
      plotX,
      plotY,
      series
    } = this,
    chart = series.chart,
    {
      xCrossLabel,
      yCrossLabel
    } = chart,
    {
      y,
      date,
      dX,
      dY
    } = _getCrCrossParam(this)(this, chart),
    xLX = _crXCrossLabelX(chart, plotX),
    yLX = _crXCrossLabelY(chart, dY),
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
    chart.xCrossLabel = _crCrossLabel(chart, date, xLX, yLX);
    chart.yCrossLabel = _crCrossLabel(chart, y, xLY, yLY);
  }
};
var _default = exports.default = handleMouserOverPoint;
//# sourceMappingURL=handleMouseOver.js.map