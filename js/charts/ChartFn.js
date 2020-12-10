"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _highcharts = _interopRequireDefault(require("highcharts"));

var _big = _interopRequireDefault(require("big.js"));

var _mathFn = _interopRequireDefault(require("../math/mathFn"));

var _formatNumber2 = _interopRequireDefault(require("../utils/formatNumber"));

var _formatAllNumber = _interopRequireDefault(require("../utils/formatAllNumber"));

var _fnArr = _interopRequireDefault(require("../utils/fnArr"));

var _DateUtils = _interopRequireDefault(require("../utils/DateUtils"));

var _Chart = _interopRequireDefault(require("./Chart"));

var _Type = require("../constants/Type");

var _WithAreaChartFn = _interopRequireDefault(require("./WithAreaChartFn"));

var _calcDeltaYAxis = _interopRequireDefault(require("./calcDeltaYAxis"));

var _crValueMoving = _mathFn["default"].crValueMoving,
    toFixedNumber = _mathFn["default"].toFixedNumber,
    calcPercent = _mathFn["default"].calcPercent;
var dateFormat = _highcharts["default"].dateFormat;

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
},
    _isNaN = Number.isNaN || isNaN,
    _isNumber = function _isNumber(n) {
  return typeof n === 'number' && n - n === 0;
},
    _isUndef = function _isUndef(v) {
  return typeof v === 'undefined';
},
    _isArr = Array.isArray,
    _assign = Object.assign,
    _fnFindIndex = _fnArr["default"].findIndexByProp('x');

var C = {
  C1_SECOND_Y_AXIS: '#f45b5b',
  C2_SECOND_Y_AXIS: '#f7a35c',
  SERIA_LABEL_CHARS: 14,
  SERIA_LABELS_IN_ROW: 3,
  SERIA_LABEL_X_DELTA: 120,
  SERIA_LABEL_Y_DELTA: 95,
  SERIA_LABEL_WIDTH: 125,
  SERIA_LABEL_HEIGHT: 20
};
var DMY_FORMAT = '%A, %b %d, %Y',
    TDMY_FORMAT = '%H:%M, %A, %b %d, %Y';

var _initOptionsZhSeries = function _initOptionsZhSeries(chart) {
  var options = chart.options;
  options.zhSeries = _assign({
    count: 0,
    titleEls: []
  }, options.zhSeries);
  return options;
};

var _crYAxisColor = function _crYAxisColor(chart) {
  switch (chart.yAxis.length) {
    case 1:
      return C.C1_SECOND_Y_AXIS;

    case 2:
      return C.C2_SECOND_Y_AXIS;

    default:
      return C.C1_SECOND_Y_AXIS;
  }
};

var _addSeries = function _addSeries(_ref) {
  var chart = _ref.chart,
      series = _ref.series,
      label = _ref.label,
      hasSecondYAxis = _ref.hasSecondYAxis;

  var _color;

  if (hasSecondYAxis) {
    _color = _crYAxisColor(chart);
    chart.addAxis(_Chart["default"].fSecondYAxis(label, _color));
    series.yAxis = label;
    series.color = _color;
  }

  if (_isArr(series)) {
    var _max = series.length - 1;

    series.forEach(function (seria, index) {
      if (hasSecondYAxis) {
        seria.yAxis = label;
      }

      var _option = index === _max ? [true, true] : [false, false];

      chart.addSeries.apply(chart, [seria].concat([_option]));
    });
  } else {
    chart.addSeries(series, true, true);
  }

  return _color;
};

var _calcXyForLabel = function _calcXyForLabel(options) {
  var seriesCount = options.zhSeries.count,
      row = Math.floor(seriesCount / C.SERIA_LABELS_IN_ROW),
      x = C.SERIA_LABEL_X_DELTA + C.SERIA_LABEL_WIDTH * seriesCount - row * (C.SERIA_LABEL_WIDTH * C.SERIA_LABELS_IN_ROW),
      y = C.SERIA_LABEL_Y_DELTA + C.SERIA_LABEL_HEIGHT * row;
  return {
    x: x,
    y: y
  };
};

var _renderSeriesLabel = function _renderSeriesLabel(_ref2) {
  var chart = _ref2.chart,
      options = _ref2.options,
      series = _ref2.series,
      _ref2$label = _ref2.label,
      label = _ref2$label === void 0 ? '' : _ref2$label,
      color = _ref2.color;

  var seriesText = label.length > C.SERIA_LABEL_CHARS ? label.substring(0, C.SERIA_LABEL_CHARS) : label,
      _calcXyForLabel2 = _calcXyForLabel(options),
      x = _calcXyForLabel2.x,
      y = _calcXyForLabel2.y;

  return chart.renderer.text(seriesText, x, y).css({
    color: color || options.colors[series._colorIndex],
    'font-size': '16px',
    'font-weight': 800
  }).add();
};

var _updateYAxisMinMax = function _updateYAxisMinMax(_ref3) {
  var _chart$yAxis;

  var hasSecondYAxis = _ref3.hasSecondYAxis,
      series = _ref3.series,
      options = _ref3.options,
      chart = _ref3.chart;

  var _yAxis = chart == null ? void 0 : (_chart$yAxis = chart.yAxis) == null ? void 0 : _chart$yAxis[0];

  if (!hasSecondYAxis && _isFn(_yAxis == null ? void 0 : _yAxis.update)) {
    var _options$yAxis;

    var _ref4 = series || {},
        minY = _ref4.minY,
        maxY = _ref4.maxY,
        _optionYAxis = options == null ? void 0 : (_options$yAxis = options.yAxis) == null ? void 0 : _options$yAxis[0],
        _ref5 = _optionYAxis || {},
        min = _ref5.min,
        max = _ref5.max,
        _min = min > minY ? minY : min,
        _max = max < maxY ? maxY : max,
        _minE = _isNumber(_min) ? _min : null,
        _maxE = _isNumber(_max) ? _max : null;

    _yAxis.setExtremes(_minE, _maxE, true);
  }
};

var _formatNumber = function _formatNumber(n) {
  return (0, _formatAllNumber["default"])(toFixedNumber(n));
};

var _setPlotLine = function _setPlotLine(plotLine, value, delta) {
  if (delta === void 0) {
    delta = '';
  }

  if (plotLine) {
    plotLine.value = value;
    plotLine.label.text = "" + _formatNumber(value) + delta;
  }
};

var _crDelta = function _crDelta(perToValue) {
  return "\xA0\xA0\u0394 " + perToValue + "%";
},
    _crPoint = function _crPoint(bValue) {
  return parseFloat(bValue.round(4).toString(), 10);
},
    _calcPerTo = function _calcPerTo(bFrom, bValue, bTotal) {
  return calcPercent({
    bValue: bFrom.minus(bValue),
    bTotal: bTotal
  });
};

var ChartFn = (0, _extends2["default"])({}, _WithAreaChartFn["default"], {
  arCalcDeltaYAxis: _calcDeltaYAxis["default"],
  addSeriaWithRenderLabel: function addSeriaWithRenderLabel(props) {
    var chart = props.chart,
        series = props.series,
        label = props.label,
        color = props.color,
        hasSecondYAxis = props.hasSecondYAxis,
        options = _initOptionsZhSeries(chart),
        _color = _addSeries({
      chart: chart,
      series: series,
      label: label,
      hasSecondYAxis: hasSecondYAxis
    }),
        textEl = _renderSeriesLabel({
      chart: chart,
      options: options,
      series: series,
      label: label,
      color: color || _color
    });

    options.zhSeries.count += 1;
    options.zhSeries.titleEls.push(textEl);

    _updateYAxisMinMax({
      hasSecondYAxis: hasSecondYAxis,
      series: series,
      options: options,
      chart: chart
    });
  },
  zoomIndicatorCharts: function zoomIndicatorCharts(event) {
    var zhDetailCharts = this.chart.options.zhDetailCharts,
        userMin = event.userMin,
        userMax = event.userMax,
        min = event.min,
        max = event.max,
        _min = userMin || min,
        _max = userMin ? userMax : max;

    zhDetailCharts.forEach(function (chart) {
      chart.xAxis[0].setExtremes(_min, _max, true, true);
    });
  },
  afterSetExtremesYAxis: function afterSetExtremesYAxis(event) {
    var trigger = event.trigger,
        userMax = event.userMax,
        userMin = event.userMin;

    if (trigger === 'zoom' && userMax) {
      this.setExtremes(userMin, userMax + (userMax - userMin) * 0.05, true, true);
    }
  },
  crValueMoving: function crValueMoving(chart, prev, dateTo) {
    var points = chart.series[0].data,
        mlsUTC = _DateUtils["default"].dmyToUTC(dateTo),
        index = _isNaN(mlsUTC) ? -1 : _fnFindIndex(points, mlsUTC),
        valueTo = index !== -1 ? points[index].y : void 0;

    return _isUndef(valueTo) ? void 0 : _assign({}, prev, _crValueMoving({
      nowValue: prev.value,
      prevValue: valueTo,
      Direction: _Type.Direction,
      fnFormat: _formatAllNumber["default"]
    }), {
      valueTo: valueTo,
      dateTo: dateTo
    });
  },
  toNumberFormat: _formatNumber2["default"],
  toNumberFormatAll: _formatAllNumber["default"],
  crTpId: function crTpId() {
    return ('TP_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 9)).toUpperCase();
  },
  toDmy: dateFormat.bind(null, DMY_FORMAT),
  toTdmy: dateFormat.bind(null, TDMY_FORMAT),
  toTdmyIf: function toTdmyIf(mls) {
    return dateFormat('%H:%M', mls) === '00:00' ? ChartFn.toDmy(mls) : ChartFn.toTdmy(mls);
  },
  setMinMaxPlotLines: function setMinMaxPlotLines(_ref6) {
    var plotLines = _ref6.plotLines,
        min = _ref6.min,
        max = _ref6.max,
        value = _ref6.value,
        isDrawDeltaExtrems = _ref6.isDrawDeltaExtrems;

    if (isDrawDeltaExtrems) {
      ChartFn.setPlotLinesDeltas({
        plotLines: plotLines,
        min: min,
        max: max,
        value: value
      });
    } else {
      ChartFn.setPlotLinesMinMax({
        plotLines: plotLines,
        min: min,
        max: max
      });
    }
  },
  setPlotLinesMinMax: function setPlotLinesMinMax(_ref7) {
    var plotLines = _ref7.plotLines,
        min = _ref7.min,
        max = _ref7.max;

    if (max > Number.NEGATIVE_INFINITY) {
      _setPlotLine(plotLines[0], max);
    }

    if (min < Number.POSITIVE_INFINITY) {
      _setPlotLine(plotLines[1], min);
    }
  },
  setPlotLinesDeltas: function setPlotLinesDeltas(_ref8) {
    var plotLines = _ref8.plotLines,
        min = _ref8.min,
        max = _ref8.max,
        value = _ref8.value;

    var _bMax = max !== Number.NEGATIVE_INFINITY ? (0, _big["default"])(max) : (0, _big["default"])(0),
        _bMin = min !== Number.POSITIVE_INFINITY ? (0, _big["default"])(min) : (0, _big["default"])(0),
        _bValue = value !== null ? (0, _big["default"])(value) : (0, _big["default"])(0),
        perToMax = _calcPerTo(_bMax, _bValue, _bValue),
        perToMin = _calcPerTo(_bValue, _bMin, _bValue);

    _setPlotLine(plotLines[0], _crPoint(_bMax), _crDelta(perToMax));

    _setPlotLine(plotLines[1], _crPoint(_bMin), _crDelta(perToMin));
  },
  calcMinY: function calcMinY(min, max) {
    return max > Number.NEGATIVE_INFINITY && min < Number.POSITIVE_INFINITY ? min - (max - min) * 1 / 6 : void 0;
  },
  setYToPoints: function setYToPoints(data, y) {
    if (y == null) {
      return;
    }

    var max = data.length;

    for (var i = 0; i < max; i++) {
      data[i].y = y;
    }
  }
});
var _default = ChartFn;
exports["default"] = _default;
//# sourceMappingURL=ChartFn.js.map