"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _formatNumber = _interopRequireDefault(require("../utils/formatNumber"));

var _dateFormat = _interopRequireDefault(require("./dateFormat"));

var _calcYAxisOffset = _interopRequireDefault(require("./calcYAxisOffset"));

const {
  formatDate
} = _dateFormat.default;
const C = {
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
  DX_Y_AXIS: 10
};

const _crDelta = (chart, dX = 0, dY = 0) => {
  const {
    xDeltaCrossLabel = 0,
    yDeltaCrossLabel = 0
  } = chart.options.chart;
  return {
    dX: xDeltaCrossLabel - dX,
    dY: yDeltaCrossLabel - dY
  };
};

const _crCrossParam = (point, chart) => {
  const _d = formatDate(C.DATE_PATTERN, point.x);

  return {
    y: point.y,
    date: _d !== C.DATE_EMPTY ? _d : '',
    ..._crDelta(chart)
  };
};

const _crCategoryCrossParam = (point, chart) => ({
  y: (0, _formatNumber.default)(point.y),
  date: point.x,
  ..._crDelta(chart, C.DX_CATEGORY, C.DY_CATEGORY)
});

const _isCrossParam = point => !point.isCategory || point.c;

const _getCrCrossParam = point => _isCrossParam(point) ? _crCrossParam : _crCategoryCrossParam;

const _crXCrossLabelX = (chart, plotX) => {
  const _yAxisOffset = (0, _calcYAxisOffset.default)(chart);

  return _yAxisOffset ? plotX + _yAxisOffset - C.DX_Y_AXIS : plotX;
};

const _crXCrossLabelY = (chart, dY) => chart.plotTop - dY;

const _crYCrossLabelX = (chart, dX) => {
  return chart.yAxis[0].width + chart.plotLeft + dX + C.CL_DX;
};

const _crYCrossLabelY = (chart, plotY) => {
  return plotY + chart.plotTop + C.CL_DY;
};

const _crCrossLabel = (chart, text, x, y) => chart.renderer.text(text, x, y).attr(C.ATTR_LABEL).css(C.CSS_LABEL).add();

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

var _default = handleMouserOverPoint;
exports.default = _default;
//# sourceMappingURL=handleMouseOver.js.map