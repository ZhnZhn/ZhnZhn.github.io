"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.zoomIndicatorCharts = exports.setYToPoints = exports.setPlotLinesMinMax = exports.crValueMoving = exports.crTpId = exports.calcYAxisMin = exports.calcMinY = exports.afterSetExtremesYAxis = exports.addSeriaWithRenderLabel = void 0;
var _big = _interopRequireDefault(require("big.js"));
var _mathFn = require("../math/mathFn");
var _seriaFn = require("../math/seriaFn");
var _seriaHelperFn = require("../math/seriaHelperFn");
var _isTypeFn = require("../utils/isTypeFn");
var _numberFormatFn = require("../utils/numberFormatFn");
var _Chart = require("./Chart");
const _assign = Object.assign,
  C1_SECOND_Y_AXIS = '#f45b5b',
  C2_SECOND_Y_AXIS = '#f7a35c',
  SERIA_LABEL_CHARS = 14,
  SERIA_LABELS_IN_ROW = 3,
  SERIA_LABEL_X_DELTA = 120,
  SERIA_LABEL_Y_DELTA = 95,
  SERIA_LABEL_WIDTH = 125,
  SERIA_LABEL_HEIGHT = 20;
const _initOptionsZhSeries = chart => {
  const {
    options
  } = chart;
  options.zhSeries = _assign({
    count: 0,
    titleEls: []
  }, options.zhSeries);
  return options;
};
const _crYAxisColor = chart => chart.yAxis.length === 2 ? C2_SECOND_Y_AXIS : C1_SECOND_Y_AXIS;
const _addSeries = _ref => {
  let {
    chart,
    series,
    label,
    hasSecondYAxis
  } = _ref;
  let _color;
  if (hasSecondYAxis) {
    _color = _crYAxisColor(chart);
    chart.addAxis((0, _Chart.fSecondYAxis)(label, _color));
    series.yAxis = label;
    series.color = _color;
  }
  if ((0, _isTypeFn.isArr)(series)) {
    const _max = series.length - 1;
    series.forEach((seria, index) => {
      if (hasSecondYAxis) {
        seria.yAxis = label;
      }
      const _option = index === _max ? [true, true] : [false, false];
      chart.addSeries(seria, ...[_option]);
    });
  } else {
    chart.addSeries(series, true, true);
  }
  return _color;
};
const _calcXyForLabel = options => {
  const seriesCount = options.zhSeries.count,
    row = Math.floor(seriesCount / SERIA_LABELS_IN_ROW),
    x = SERIA_LABEL_X_DELTA + SERIA_LABEL_WIDTH * seriesCount - row * (SERIA_LABEL_WIDTH * SERIA_LABELS_IN_ROW),
    y = SERIA_LABEL_Y_DELTA + SERIA_LABEL_HEIGHT * row;
  return {
    x,
    y
  };
};
const _getLabelText = label => (label || '').length > SERIA_LABEL_CHARS ? label.substring(0, SERIA_LABEL_CHARS) : label;
const _getRecentSeriaColor = chart => {
  const {
      series
    } = chart,
    _len = (series || []).length;
  return _len > 0 ? series[_len - 1].color : void 0;
};
const _renderSeriesLabel = (chart, labelText, x, y, color) => chart.renderer.text(labelText, x, y).css({
  color,
  'font-size': '16px',
  'font-weight': 800
}).add();
const _getMinMaxFromSeries = (series, options) => {
  const {
      minY,
      maxY
    } = series || {},
    _optionYAxis = options?.yAxis?.[0],
    {
      min,
      max
    } = _optionYAxis || {},
    _min = min > minY ? minY : min,
    _max = max < maxY ? maxY : max;
  return [(0, _isTypeFn.isNumber)(_min) ? _min : null, (0, _isTypeFn.isNumber)(_max) ? _max : null];
};
const _updateYAxisMinMax = (_ref2, options) => {
  let {
    hasSecondYAxis,
    series,
    chart
  } = _ref2;
  const _yAxis = chart?.yAxis?.[0];
  if (!hasSecondYAxis && (0, _isTypeFn.isFn)(_yAxis?.update)) {
    const [min, max] = _getMinMaxFromSeries(series, options);
    _yAxis.setExtremes(min, max, true);
  }
};
const _getMinMaxFromEvent = _ref3 => {
  let {
    userMin,
    userMax,
    min,
    max
  } = _ref3;
  return [userMin || min, userMin ? userMax : max];
};
const addSeriaWithRenderLabel = props => {
  // { chart, series, label, hasSecondYAxis } = props
  const {
      chart
    } = props,
    chartOptions = _initOptionsZhSeries(chart),
    _color = _addSeries(props),
    labelText = _getLabelText(props.label),
    {
      x,
      y
    } = _calcXyForLabel(chartOptions),
    textEl = _renderSeriesLabel(chart, labelText, x, y, props.color || _color || _getRecentSeriaColor(chart));
  chartOptions.zhSeries.count += 1;
  chartOptions.zhSeries.titleEls.push(textEl);
  _updateYAxisMinMax(props, chartOptions);
};
exports.addSeriaWithRenderLabel = addSeriaWithRenderLabel;
const zoomIndicatorCharts = function (event) {
  const [min, max] = _getMinMaxFromEvent(event);
  (this.chart.options.zhDetailCharts || []).forEach(chart => {
    chart.xAxis[0].setExtremes(min, max, true, true);
  });
};
exports.zoomIndicatorCharts = zoomIndicatorCharts;
const afterSetExtremesYAxis = function (event) {
  const {
    trigger,
    userMax,
    userMin
  } = event;
  if (trigger === 'zoom' && userMax) {
    this.setExtremes(userMin, userMax + (userMax - userMin) * 0.05, true, true);
  }
};
exports.afterSetExtremesYAxis = afterSetExtremesYAxis;
const crValueMoving = (chart, prev, dateTo) => {
  const _id = (chart.userOptions.zhConfig || {}).id,
    points = chart.series[0].data,
    index = (0, _seriaFn.findDateIndex)(points, dateTo),
    valueTo = index === -1 ? void 0 : (0, _seriaHelperFn.getPointValue)(points[index]);
  return (0, _isTypeFn.isNumber)(valueTo) ? _assign({}, prev, (0, _mathFn.crValueMoving)({
    nowValue: prev.value,
    prevValue: valueTo,
    fnFormat: _numberFormatFn.formatAllNumber
  }), {
    valueTo,
    dateTo,
    _id
  }) : void 0;
};
exports.crValueMoving = crValueMoving;
const crTpId = () => (0, _mathFn.crId)('TP_');
exports.crTpId = crTpId;
const _formatNumber = n => (0, _numberFormatFn.formatAllNumber)((0, _mathFn.toFixedNumber)(n));
const _setPlotLine = function (plotLine, value, delta) {
  if (delta === void 0) {
    delta = '';
  }
  if (plotLine) {
    plotLine.value = value;
    plotLine.label.text = `${_formatNumber(value)}${delta}`;
  }
};
const _crDelta = perToValue => `\u00A0\u00A0Δ ${perToValue}%`
  //, _crPoint = bValue => parseFloat(bValue.round(4).toString(), 10)
  ,
  _crStrDelta = (bFrom, bValue, bTotal) => _crDelta((0, _mathFn.calcPercent)({
    bValue: bFrom.minus(bValue),
    bTotal
  }));
const _crBigValueOrZero = (value, initialValue) => value !== initialValue ? (0, _big.default)(value) : (0, _big.default)(0);
const _calcMinMaxDeltas = (min, max, value) => {
  const _bMax = _crBigValueOrZero(max, _mathFn.NEGATIVE_INFINITY),
    _bMin = _crBigValueOrZero(min, _mathFn.POSITIVE_INFINITY),
    _bValue = (0, _big.default)(value);
  return [_crStrDelta(_bMax, _bValue, _bValue), _crStrDelta(_bValue, _bMin, _bValue)];
};
const setPlotLinesMinMax = (plotLines, min, max, value) => {
  const [strDeltaMax, strDeltaMin] = (0, _isTypeFn.isNumber)(value) ? _calcMinMaxDeltas(min, max, value) : [];
  if (max > _mathFn.NEGATIVE_INFINITY) {
    _setPlotLine(plotLines[0], max, strDeltaMax);
  }
  if (min < _mathFn.POSITIVE_INFINITY) {
    _setPlotLine(plotLines[1], min, strDeltaMin);
  }
};
exports.setPlotLinesMinMax = setPlotLinesMinMax;
const calcMinY = (min, max) => max > _mathFn.NEGATIVE_INFINITY && min < _mathFn.POSITIVE_INFINITY ? min >= 0 && min <= (max - min) / 6 ? void 0 : min - (max - min) / 6 : void 0;
exports.calcMinY = calcMinY;
const calcYAxisMin = (min, max, noZoom) => noZoom && min >= 0 ? 0 : calcMinY(min, max);
exports.calcYAxisMin = calcYAxisMin;
const setYToPoints = (data, y) => {
  if (y == null) {
    return;
  }
  data.forEach(point => point.y = y);
};
exports.setYToPoints = setYToPoints;
//# sourceMappingURL=ChartFn.js.map