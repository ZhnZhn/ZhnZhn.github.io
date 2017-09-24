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

var _WithAreaChartFn = require('./WithAreaChartFn');

var _WithAreaChartFn2 = _interopRequireDefault(_WithAreaChartFn);

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
  },

  CL_DY: 4,

  DX_CATEGORY: 40,
  DY_CATEGORY: 32
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
    (function () {
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
    })();
  } else {
    chart.addSeries(series, true, true);
  }
  return _color;
};

var _renderSeriesLabel = function _renderSeriesLabel(_ref2) {
  var chart = _ref2.chart,
      options = _ref2.options,
      series = _ref2.series,
      _ref2$label = _ref2.label,
      label = _ref2$label === undefined ? '' : _ref2$label,
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

var _crCrossParam = function _crCrossParam(point, chart) {
  return {
    y: point.y,
    date: _highcharts2.default.dateFormat(C.DATE_PATTERN, point.x),
    dX: chart.options.chart.xDeltaCrossLabel,
    dY: chart.options.chart.yDeltaCrossLabel
  };
};

var _crCategoryCrossParam = function _crCategoryCrossParam(point, chart) {
  return {
    y: ChartFn.toNumberFormat(point.y),
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

var ChartFn = (0, _extends3.default)({}, _WithAreaChartFn2.default, {
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
    var isCategory = this.isCategory,
        plotX = this.plotX,
        plotY = this.plotY,
        _series = this.series,
        series = _series === undefined ? {} : _series,
        chart = series.chart,
        _ref4 = !isCategory ? _crCrossParam(this, chart) : _crCategoryCrossParam(this, chart),
        y = _ref4.y,
        date = _ref4.date,
        dX = _ref4.dX,
        dY = _ref4.dY;

    if (chart.xCrossLabel) {
      chart.xCrossLabel.attr({
        x: plotX,
        text: date
      });
      chart.yCrossLabel.attr({
        x: _crYCrossLabelX(chart, dX),
        y: _crYCrossLabelY(chart, plotY),
        text: y
      });
    } else {
      chart.xCrossLabel = chart.renderer.text(date, plotX, chart.plotTop - dY).attr(C.ATTR_LABEL).css(C.CSS_LABEL).add();
      chart.yCrossLabel = chart.renderer.text(y, _crYCrossLabelX(chart, dX), _crYCrossLabelY(chart, plotY)).attr(C.ATTR_LABEL).css(C.CSS_LABEL).add();
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
  },
  addDataTo: function addDataTo(toChart, color, data, withoutYAxis) {
    var _id = withoutYAxis ? undefined : "pasteId";
    if (!withoutYAxis) {
      toChart.addAxis({
        id: _id,
        opossite: true,
        title: {
          text: ''
        },
        lineColor: color,
        tickColor: color,
        labels: {
          style: {
            color: color
          }
        }
      }, false, true);
    }
    toChart.addSeries({
      type: 'spline',
      yAxis: _id,
      color: color,
      data: data
    }, false);
    toChart.redraw();
  },
  toNumberFormat: function toNumberFormat(value) {
    var arrSplit = (value + '').split('.'),
        decimal = arrSplit[1] ? 2 : 0;
    return _highcharts2.default.numberFormat(value, decimal, '.', ' ');
  }
});

exports.default = ChartFn;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\charts\ChartFn.js.map