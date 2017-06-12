'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _highcharts = require('highcharts');

var _highcharts2 = _interopRequireDefault(_highcharts);

var _mathFn = require('../math/mathFn');

var _mathFn2 = _interopRequireDefault(_mathFn);

var _ArrayUtil = require('../utils/ArrayUtil');

var _ArrayUtil2 = _interopRequireDefault(_ArrayUtil);

var _DateUtils = require('../utils/DateUtils');

var _DateUtils2 = _interopRequireDefault(_DateUtils);

var _safeGet = require('../utils/safeGet');

var _safeGet2 = _interopRequireDefault(_safeGet);

var _Chart = require('./Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _ChartConfig = require('./ChartConfig');

var _ChartConfig2 = _interopRequireDefault(_ChartConfig);

var _Type = require('../constants/Type');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _fnFindIndex = _ArrayUtil2.default.findIndexByProp('x');

var C = {
  C1_SECOND_Y_AXIS: '#f45b5b',
  C2_SECOND_Y_AXIS: '#f7a35c',
  SERIA_LABEL_CHARS: 12,
  SERIA_LABELS_IN_ROW: 3,
  SERIA_LABEL_X_DELTA: 145,
  SERIA_LABEL_Y_DELTA: 95,
  SERIA_LABEL_WIDTH: 125,
  SERIA_LABEL_HEIGHT: 20,
  DATE_PATTERN: '%d-%m-%Y',
  ATTR_LABEL: {
    zIndex: 100
  },
  CSS_LABEL: {
    color: 'yellow',
    fontSize: '15px'
  }
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
  var _ = chart.yAxis.length;
  if (_ === 1) {
    return C.C1_SECOND_Y_AXIS;
  } else if (_ === 2) {
    return C.C2_SECOND_Y_AXIS;
  } else {
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
  chart.addSeries(series, true, true);
  return _color;
};

var _renderSeriesLabel = function _renderSeriesLabel(_ref2) {
  var chart = _ref2.chart,
      options = _ref2.options,
      series = _ref2.series,
      label = _ref2.label,
      color = _ref2.color;

  var seriesText = label.length > C.SERIA_LABEL_CHARS ? label.substring(0, C.SERIA_LABEL_CHARS) : label,
      seriesCount = options.zhSeries.count,
      row = Math.floor(seriesCount / C.SERIA_LABELS_IN_ROW),
      x = C.SERIA_LABEL_X_DELTA + C.SERIA_LABEL_WIDTH * seriesCount - row * (C.SERIA_LABEL_WIDTH * C.SERIA_LABELS_IN_ROW),
      y = C.SERIA_LABEL_Y_DELTA + C.SERIA_LABEL_HEIGHT * row;

  var textEl = chart.renderer.text(seriesText, x, y).css({
    color: color ? color : options.colors[series._colorIndex],
    'font-size': '16px'
  }).add();
  return textEl;
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

var ChartFn = {
  addSeriaWithRenderLabel: function addSeriaWithRenderLabel(props) {
    var chart = props.chart,
        series = props.series,
        label = props.label,
        hasSecondYAxis = props.hasSecondYAxis;


    var options = _initOptionsZhSeries(chart);
    var color = _addSeries({ chart: chart, series: series, label: label, hasSecondYAxis: hasSecondYAxis });
    var textEl = _renderSeriesLabel({ chart: chart, options: options, series: series, label: label, color: color });

    options.zhSeries.count += 1;
    options.zhSeries.titleEls.push(textEl);

    _updateYAxisMin({ hasSecondYAxis: hasSecondYAxis, series: series, options: options, chart: chart });
  },
  handlerMouserOverPoint: function handlerMouserOverPoint(event) {
    var chart = this.series.chart,
        x = this.x,
        y = this.y,
        plotX = this.plotX,
        plotY = this.plotY,
        date = _highcharts2.default.dateFormat(C.DATE_PATTERN, x),
        dX = chart.options.chart.xDeltaCrossLabel,
        dY = chart.options.chart.yDeltaCrossLabel;

    if (chart.xCrossLabel) {
      chart.xCrossLabel.attr({
        x: plotX,
        text: date
      });
      chart.yCrossLabel.attr({
        x: chart.yAxis[0].width + chart.plotLeft + dX,
        y: plotY + chart.plotTop,
        text: y
      });
    } else {
      chart.xCrossLabel = chart.renderer.text(date, plotX, chart.plotTop - dY).attr(C.ATTR_LABEL).css(C.CSS_LABEL).add();
      chart.yCrossLabel = chart.renderer.text(y, chart.yAxis[0].width + chart.plotLeft + dX, plotY + chart.plotTop).attr(C.ATTR_LABEL).css(C.CSS_LABEL).add();
    }
  },
  toggleSeria: function toggleSeria(chart, item) {
    var name = item.name,
        color = item.color,
        index = item.index,
        isSecondAxes = item.isSecondAxes,
        seria = item.seria;


    if (isSecondAxes) {
      if (!seria.visible) {
        chart.addAxis(_Chart2.default.fSecondYAxis(name, color));
        seria.yAxis = name;
        seria.visible = true;
        chart.addSeries(seria);
      } else {
        seria.visible = false;
        chart.get(name).remove();
      }
    } else {
      var _seria = chart.series[index];
      if (_seria.visible) {
        _seria.hide();
      } else {
        _seria.show();
      }
    }
  },
  zoomIndicatorCharts: function zoomIndicatorCharts(event) {
    var zhDetailCharts = this.chart.options.zhDetailCharts;
    if (event.userMin) {
      zhDetailCharts.forEach(function (chart) {
        chart.xAxis[0].setExtremes(event.userMin, event.userMax, true, true);
      });
    } else {
      zhDetailCharts.forEach(function (chart) {
        chart.xAxis[0].setExtremes(event.min, event.max, true, true);
      });
    }
  },
  crValueMoving: function crValueMoving(chart, prev, dateTo) {
    var points = chart.series[0].data,
        millisUTC = _DateUtils2.default.dmyToUTC(dateTo),
        index = _fnFindIndex(points, millisUTC);

    var valueTo = void 0;
    if (index !== -1) {
      valueTo = points[index].y;
      var valueMoving = Object.assign({}, prev, _mathFn2.default.crValueMoving({
        nowValue: prev.value,
        prevValue: valueTo,
        Direction: _Type.Direction,
        fnFormat: _ChartConfig2.default.fnNumberFormat
      }), { valueTo: valueTo, dateTo: dateTo });
      return valueMoving;
    } else {
      return undefined;
    }
  }
};

exports.default = ChartFn;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\charts\ChartFn.js.map