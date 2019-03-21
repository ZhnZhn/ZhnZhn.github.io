'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _highcharts = require('highcharts');

var _highcharts2 = _interopRequireDefault(_highcharts);

var _mathFn = require('../math/mathFn');

var _mathFn2 = _interopRequireDefault(_mathFn);

var _formatNumber = require('../utils/formatNumber');

var _formatNumber2 = _interopRequireDefault(_formatNumber);

var _formatAllNumber = require('../utils/formatAllNumber');

var _formatAllNumber2 = _interopRequireDefault(_formatAllNumber);

var _fnArr = require('../utils/fnArr');

var _fnArr2 = _interopRequireDefault(_fnArr);

var _DateUtils = require('../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _safeGet = require('../utils/safeGet');

var _safeGet2 = _interopRequireDefault(_safeGet);

var _Chart = require('./Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _Type = require('../constants/Type');

var _WithAreaChartFn = require('./WithAreaChartFn');

var _WithAreaChartFn2 = _interopRequireDefault(_WithAreaChartFn);

var _calcDeltaYAxis = require('./calcDeltaYAxis');

var _calcDeltaYAxis2 = _interopRequireDefault(_calcDeltaYAxis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _crValueMoving = _mathFn2.default.crValueMoving,
    toFixedNumber = _mathFn2.default.toFixedNumber;


var _fnFindIndex = _fnArr2.default.findIndexByProp('x');

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

var _fnNoop = function _fnNoop() {};

var _initOptionsZhSeries = function _initOptionsZhSeries(chart) {
  var options = chart.options,
      zhSeries = options.zhSeries;
  if (!zhSeries) {
    options.zhSeries = {
      count: 0,
      titleEls: []
    };
  } else if (!zhSeries.titleEls) {
    zhSeries.titleEls = [];
  }
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

  var _color = void 0;
  if (hasSecondYAxis) {
    _color = _crYAxisColor(chart);
    chart.addAxis(_Chart2.default.fSecondYAxis(label, _color));
    series.yAxis = label;
    series.color = _color;
  }

  if (Array.isArray(series)) {
    var _max = series.length - 1;
    series.forEach(function (seria, index) {
      if (hasSecondYAxis) {
        seria.yAxis = label;
      }
      if (index !== _max) {
        chart.addSeries(seria, false, false);
      } else {
        chart.addSeries(seria, true, true);
      }
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
  return { x: x, y: y };
};
var _renderSeriesLabel = function _renderSeriesLabel(_ref2) {
  var chart = _ref2.chart,
      options = _ref2.options,
      series = _ref2.series,
      _ref2$label = _ref2.label,
      label = _ref2$label === undefined ? '' : _ref2$label,
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

var _updateYAxisMin = function _updateYAxisMin(_ref3) {
  var hasSecondYAxis = _ref3.hasSecondYAxis,
      series = _ref3.series,
      _ref3$options = _ref3.options,
      options = _ref3$options === undefined ? {} : _ref3$options,
      chart = _ref3.chart;

  var minY = series.minY,
      min = (0, _safeGet2.default)(options, 'yAxis[0].min'),
      _yAxis = (0, _safeGet2.default)(chart, 'yAxis[0]'),
      update = (0, _safeGet2.default)(chart, 'yAxis[0].update', _fnNoop).bind(_yAxis);
  if (!hasSecondYAxis && minY !== undefined && min > minY) {
    update({ min: minY, startOnTick: true });
  }
};

var _setPlotLine = function _setPlotLine(plotLine, value) {
  plotLine.value = value;
  plotLine.label.text = (0, _formatAllNumber2.default)(toFixedNumber(value));
};

var ChartFn = (0, _extends3.default)({}, _WithAreaChartFn2.default, {
  arCalcDeltaYAxis: _calcDeltaYAxis2.default,

  addSeriaWithRenderLabel: function addSeriaWithRenderLabel(props) {
    var chart = props.chart,
        series = props.series,
        label = props.label,
        color = props.color,
        hasSecondYAxis = props.hasSecondYAxis,
        options = _initOptionsZhSeries(chart),
        _color = _addSeries({
      chart: chart, series: series, label: label, hasSecondYAxis: hasSecondYAxis
    }),
        textEl = _renderSeriesLabel({
      chart: chart, options: options, series: series, label: label,
      color: color || _color
    });

    options.zhSeries.count += 1;
    options.zhSeries.titleEls.push(textEl);

    _updateYAxisMin({ hasSecondYAxis: hasSecondYAxis, series: series, options: options, chart: chart });
  },
  zoomIndicatorCharts: function zoomIndicatorCharts(event) {
    var zhDetailCharts = this.chart.options.zhDetailCharts,
        userMin = event.userMin,
        userMax = event.userMax,
        min = event.min,
        max = event.max;

    if (userMin) {
      zhDetailCharts.forEach(function (chart) {
        chart.xAxis[0].setExtremes(userMin, userMax, true, true);
      });
    } else {
      zhDetailCharts.forEach(function (chart) {
        chart.xAxis[0].setExtremes(min, max, true, true);
      });
    }
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
        millisUTC = _DateUtils2.default.dmyToUTC(dateTo),
        index = _fnFindIndex(points, millisUTC),
        valueTo = index !== -1 ? points[index].y : undefined;

    return valueTo !== undefined ? Object.assign({}, prev, _crValueMoving({
      nowValue: prev.value,
      prevValue: valueTo,
      Direction: _Type.Direction,
      fnFormat: _formatAllNumber2.default
    }), { valueTo: valueTo, dateTo: dateTo }) : undefined;
  },


  toNumberFormat: _formatNumber2.default,
  toNumberFormatAll: _formatAllNumber2.default,

  crTpId: function crTpId() {
    return ('TP_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 9)).toUpperCase();
  },

  toDateFormatDMY: _highcharts2.default.dateFormat.bind(null, '%A, %b %d, %Y'),
  toDateFormatDMYT: _highcharts2.default.dateFormat.bind(null, '%A, %b %d, %Y, %H:%M'),

  setPlotLinesMinMax: function setPlotLinesMinMax(_ref4) {
    var plotLines = _ref4.plotLines,
        min = _ref4.min,
        max = _ref4.max;

    if (max > Number.NEGATIVE_INFINITY) {
      _setPlotLine(plotLines[0], max);
    }
    if (min < Number.POSITIVE_INFINITY) {
      _setPlotLine(plotLines[1], min);
    }
  }

});

exports.default = ChartFn;
//# sourceMappingURL=ChartFn.js.map