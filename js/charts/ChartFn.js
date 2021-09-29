"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _big = _interopRequireDefault(require("big.js"));

var _mathFn = _interopRequireDefault(require("../math/mathFn"));

var _formatNumber2 = _interopRequireDefault(require("../utils/formatNumber"));

var _formatAllNumber = _interopRequireDefault(require("../utils/formatAllNumber"));

var _fnArr = _interopRequireDefault(require("../utils/fnArr"));

var _DateUtils = _interopRequireDefault(require("../utils/DateUtils"));

var _Chart = _interopRequireDefault(require("./Chart"));

var _Type = require("../constants/Type");

var _calcYAxisOffset = _interopRequireDefault(require("./calcYAxisOffset"));

var _crMetricConfig = _interopRequireDefault(require("./crMetricConfig"));

var _dateFormat = _interopRequireDefault(require("./dateFormat"));

const {
  toDmy,
  toTdmy,
  toTdmyIf
} = _dateFormat.default;
const {
  crValueMoving,
  toFixedNumber,
  calcPercent,
  crId
} = _mathFn.default;

const _isFn = fn => typeof fn === 'function',
      _isNaN = Number.isNaN,
      _isNumber = n => typeof n === 'number' && n - n === 0,
      _isUndef = v => typeof v === 'undefined',
      _isArr = Array.isArray,
      _assign = Object.assign,
      _fnFindIndex = _fnArr.default.findIndexByProp('x');

const C = {
  C1_SECOND_Y_AXIS: '#f45b5b',
  C2_SECOND_Y_AXIS: '#f7a35c',
  SERIA_LABEL_CHARS: 14,
  SERIA_LABELS_IN_ROW: 3,
  SERIA_LABEL_X_DELTA: 120,
  SERIA_LABEL_Y_DELTA: 95,
  SERIA_LABEL_WIDTH: 125,
  SERIA_LABEL_HEIGHT: 20
};

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

const _crYAxisColor = chart => {
  switch (chart.yAxis.length) {
    case 1:
      return C.C1_SECOND_Y_AXIS;

    case 2:
      return C.C2_SECOND_Y_AXIS;

    default:
      return C.C1_SECOND_Y_AXIS;
  }
};

const _addSeries = ({
  chart,
  series,
  label,
  hasSecondYAxis
}) => {
  let _color;

  if (hasSecondYAxis) {
    _color = _crYAxisColor(chart);
    chart.addAxis(_Chart.default.fSecondYAxis(label, _color));
    series.yAxis = label;
    series.color = _color;
  }

  if (_isArr(series)) {
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
        row = Math.floor(seriesCount / C.SERIA_LABELS_IN_ROW),
        x = C.SERIA_LABEL_X_DELTA + C.SERIA_LABEL_WIDTH * seriesCount - row * (C.SERIA_LABEL_WIDTH * C.SERIA_LABELS_IN_ROW),
        y = C.SERIA_LABEL_Y_DELTA + C.SERIA_LABEL_HEIGHT * row;
  return {
    x,
    y
  };
};

const _renderSeriesLabel = ({
  chart,
  options,
  series,
  label = '',
  color
}) => {
  const seriesText = label.length > C.SERIA_LABEL_CHARS ? label.substring(0, C.SERIA_LABEL_CHARS) : label,
        {
    x,
    y
  } = _calcXyForLabel(options);

  return chart.renderer.text(seriesText, x, y).css({
    color: color || options.colors[series._colorIndex],
    'font-size': '16px',
    'font-weight': 800
  }).add();
};

const _updateYAxisMinMax = ({
  hasSecondYAxis,
  series,
  options,
  chart
}) => {
  var _chart$yAxis;

  const _yAxis = chart == null ? void 0 : (_chart$yAxis = chart.yAxis) == null ? void 0 : _chart$yAxis[0];

  if (!hasSecondYAxis && _isFn(_yAxis == null ? void 0 : _yAxis.update)) {
    var _options$yAxis;

    const {
      minY,
      maxY
    } = series || {},
          _optionYAxis = options == null ? void 0 : (_options$yAxis = options.yAxis) == null ? void 0 : _options$yAxis[0],
          {
      min,
      max
    } = _optionYAxis || {},
          _min = min > minY ? minY : min,
          _max = max < maxY ? maxY : max,
          _minE = _isNumber(_min) ? _min : null,
          _maxE = _isNumber(_max) ? _max : null;

    _yAxis.setExtremes(_minE, _maxE, true);
  }
};

const _formatNumber = n => (0, _formatAllNumber.default)(toFixedNumber(n));

const _setPlotLine = (plotLine, value, delta = '') => {
  if (plotLine) {
    plotLine.value = value;
    plotLine.label.text = "" + _formatNumber(value) + delta;
  }
};

const _crDelta = perToValue => "\xA0\xA0\u0394 " + perToValue + "%",
      _crPoint = bValue => parseFloat(bValue.round(4).toString(), 10),
      _calcPerTo = (bFrom, bValue, bTotal) => calcPercent({
  bValue: bFrom.minus(bValue),
  bTotal
});

const ChartFn = {
  toDmy,
  toTdmy,
  toTdmyIf,
  calcYAxisOffset: _calcYAxisOffset.default,
  crMetricConfig: _crMetricConfig.default,

  addSeriaWithRenderLabel(props) {
    const {
      chart,
      series,
      label,
      color,
      hasSecondYAxis
    } = props,
          options = _initOptionsZhSeries(chart),
          _color = _addSeries({
      chart,
      series,
      label,
      hasSecondYAxis
    }),
          textEl = _renderSeriesLabel({
      chart,
      options,
      series,
      label,
      color: color || _color
    });

    options.zhSeries.count += 1;
    options.zhSeries.titleEls.push(textEl);

    _updateYAxisMinMax({
      hasSecondYAxis,
      series,
      options,
      chart
    });
  },

  zoomIndicatorCharts(event) {
    const zhDetailCharts = this.chart.options.zhDetailCharts,
          {
      userMin,
      userMax,
      min,
      max
    } = event,
          _min = userMin || min,
          _max = userMin ? userMax : max;

    zhDetailCharts.forEach(chart => {
      chart.xAxis[0].setExtremes(_min, _max, true, true);
    });
  },

  afterSetExtremesYAxis(event) {
    const {
      trigger,
      userMax,
      userMin
    } = event;

    if (trigger === 'zoom' && userMax) {
      this.setExtremes(userMin, userMax + (userMax - userMin) * 0.05, true, true);
    }
  },

  crValueMoving(chart, prev, dateTo) {
    const points = chart.series[0].data,
          mlsUTC = _DateUtils.default.dmyToUTC(dateTo),
          index = _isNaN(mlsUTC) ? -1 : _fnFindIndex(points, mlsUTC),
          valueTo = index !== -1 ? points[index].y : void 0;

    return _isUndef(valueTo) ? void 0 : _assign({}, prev, crValueMoving({
      nowValue: prev.value,
      prevValue: valueTo,
      Direction: _Type.Direction,
      fnFormat: _formatAllNumber.default
    }), {
      valueTo,
      dateTo
    });
  },

  toNumberFormat: _formatNumber2.default,
  toNumberFormatAll: _formatAllNumber.default,
  crId,
  crTpId: () => crId('TP_'),
  setPlotLinesMinMax: ({
    plotLines,
    min,
    max
  }) => {
    if (max > Number.NEGATIVE_INFINITY) {
      _setPlotLine(plotLines[0], max);
    }

    if (min < Number.POSITIVE_INFINITY) {
      _setPlotLine(plotLines[1], min);
    }
  },
  setPlotLinesDeltas: ({
    plotLines,
    min,
    max,
    value
  }) => {
    const _bMax = max !== Number.NEGATIVE_INFINITY ? (0, _big.default)(max) : (0, _big.default)(0),
          _bMin = min !== Number.POSITIVE_INFINITY ? (0, _big.default)(min) : (0, _big.default)(0),
          _bValue = value !== null ? (0, _big.default)(value) : (0, _big.default)(0),
          perToMax = _calcPerTo(_bMax, _bValue, _bValue),
          perToMin = _calcPerTo(_bValue, _bMin, _bValue);

    _setPlotLine(plotLines[0], _crPoint(_bMax), _crDelta(perToMax));

    _setPlotLine(plotLines[1], _crPoint(_bMin), _crDelta(perToMin));
  },
  calcMinY: (min, max) => max > Number.NEGATIVE_INFINITY && min < Number.POSITIVE_INFINITY ? min - (max - min) * 1 / 6 : void 0,
  setYToPoints: (data, y) => {
    if (y == null) {
      return;
    }

    const max = data.length;

    for (let i = 0; i < max; i++) {
      data[i].y = y;
    }
  }
};
var _default = ChartFn;
exports.default = _default;
//# sourceMappingURL=ChartFn.js.map