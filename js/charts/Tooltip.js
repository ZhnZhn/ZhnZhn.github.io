'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _highcharts = require('highcharts');

var _highcharts2 = _interopRequireDefault(_highcharts);

var _reactDom = require('react-dom');

var _ChartFn = require('./ChartFn');

var _ChartFn2 = _interopRequireDefault(_ChartFn);

var _SparkFactory = require('../components/factories/SparkFactory');

var _SparkFactory2 = _interopRequireDefault(_SparkFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SPARKLINES_SUFFIX_ID = 'sparklines',
    SPARKLINES_BAR_SUFFIX_ID = 'sparklines_bar',
    WIDTH_CHAR = 10,
    WIDTH_VALUE = 54,
    WIDTH_TOTAL = 50,
    WIDTH_SPARK = 20 + 80 + 16;

var _fnTooltipHeader = function _fnTooltipHeader(date, id) {
  var cssClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  return '<div id="' + id + '" class="tp__header not-selected ' + cssClass + '">\n  <span class="tp__header__caption">' + date + '</span>\n  <span class="tp__header__close">X</span>\n  </div>';
};

var _fnTooltipSparkType4 = function _fnTooltipSparkType4(_ref) {
  var fullWidth = _ref.fullWidth,
      width = _ref.width,
      year = _ref.year,
      value = _ref.value,
      total = _ref.total,
      percent = _ref.percent,
      id = _ref.id;

  return '<div class="tp__body">\n  <div class="tp__body__part1" style="width:' + fullWidth + 'px;" >\n    <div style="float:left;padding-right:10px;width:' + width + 'px;">\n      <span class="tp__body__title">Year: </span>\n      <span class="tp__body__year">' + year + '</span></br>\n      <span class="tp__body__title">Value: </span>\n      <span class="tp__body__value">' + value + '</span></br>\n    </div>\n    <div id="' + id + '_' + SPARKLINES_SUFFIX_ID + '" class="tp__body__sparklines">\n    </div>\n  </div>\n  <div class="tp__body__part1" style="width:' + fullWidth + 'px;" >\n    <div style="float:left;padding-right:10px;width:' + width + 'px;">\n      <span class="tp__body__title">Total: </span>\n      <span class="tp__body__value">' + total + '</span></br>\n      <span class="tp__body__title">Percent: </span>\n      <span class="tp__body__value">' + percent + '</span></br>\n    </div>\n    <div id="' + id + '_' + SPARKLINES_BAR_SUFFIX_ID + '" class="tp__body__sparklines">\n    </div>\n  </div>';
};

var _fnBaseTooltip = function _fnBaseTooltip(_ref2) {
  var date = _ref2.date,
      id = _ref2.id,
      color = _ref2.color,
      _ref2$valueText = _ref2.valueText,
      valueText = _ref2$valueText === undefined ? 'Value' : _ref2$valueText,
      value = _ref2.value;

  var _style = color ? 'style="color:' + color + ';"' : '';
  return _fnTooltipHeader(date, id) + ('<div class="tp__body">\n  <span class="tp__body__title">' + valueText + ':&nbsp;</span>\n  <span class="tp__body__value" ' + _style + '>' + value + '</span>\n  </div>');
};

var _fnExDividend = function _fnExDividend(_ref3) {
  var date = _ref3.date,
      id = _ref3.id,
      valueText = _ref3.valueText,
      value = _ref3.value,
      point = _ref3.point;

  return _fnTooltipHeader(date, id) + ('<div class="tp__body">\n  <span class="tp__body__title">Ex-Dividend: </span>\n  <span style="color: #90ed7d;">' + point.exValue + '</span><br/>\n  <span class="tp__body__title">Close: </span>\n  <span class="tp__body__value">' + point.price + '</span>\n  </div>');
};

var _fnSplitRatio = function _fnSplitRatio(_ref4) {
  var date = _ref4.date,
      id = _ref4.id,
      valueText = _ref4.valueText,
      value = _ref4.value,
      point = _ref4.point;

  return _fnTooltipHeader(date, id) + ('<div class="tp__body">\n  <span class="tp__body__title">Split Ratio: </span>\n  <span style="color: #ED5813;">' + point.splitRatio + '</span><br/>\n  <span class="tp__body__title">Close: </span>\n  <span class="tp__body__value">' + point.price + '</span>\n  </div>');
};

var _fnVolumeTooltip = function _fnVolumeTooltip(_ref5) {
  var date = _ref5.date,
      id = _ref5.id,
      value = _ref5.value,
      point = _ref5.point;

  var _point$_open = point._open,
      _open = _point$_open === undefined ? 'NoData' : _point$_open,
      _point$_close = point._close,
      _close = _point$_close === undefined ? '' : _point$_close,
      _point$_low = point._low,
      _low = _point$_low === undefined ? '' : _point$_low,
      _point$_high = point._high,
      _high = _point$_high === undefined ? '' : _point$_high;

  return _fnTooltipHeader(date, id) + ('<div class="tp__body">\n  <span class="tp__body__title">Volume: </span>\n  <span class="tp__body__value">' + value + '</span><br/>\n  <span class="tp__body__title">Open: </span>\n  <span class="tp__body__value">' + _open + '</span>\n  <span class="tp__body__title"> Close: </span>\n  <span class="tp__body__value">' + _close + '</span><br/>\n  <span class="tp__body__title">Low: </span>\n  <span class="tp__body__value">' + _low + '</span>\n  <span class="tp__body__title"> High: </span>\n  <span class="tp__body__value">' + _high + '</span>\n  </div>');
};

var _fnATHTooltip = function _fnATHTooltip(_ref6) {
  var date = _ref6.date,
      id = _ref6.id,
      value = _ref6.value,
      point = _ref6.point;

  return _fnTooltipHeader(date, id) + ('<div class="tp__body">\n   <span class="tp__body__title">ATH: </span>\n   <span class="tp__body__value" style="color:' + point.color + ';">' + point.y + '%</span><br/>\n   <span class="tp__body__title">Prev Close: </span>\n   <span class="tp__body__value">' + point.close + '</span><br/>\n   <span class="tp__body__title">Next Open: </span>\n   <span class="tp__body__value">' + point.open + '</span><br/>\n   </div>');
};

var _fnHighLowTooltip = function _fnHighLowTooltip(_ref7) {
  var date = _ref7.date,
      id = _ref7.id,
      value = _ref7.value,
      point = _ref7.point;
  var open = point.open,
      dayHigh = point.dayHigh,
      dayLow = point.dayLow,
      close = point.close;

  return _fnTooltipHeader(date, id) + ('<div class="tp__body">\n  <span class="tp__body__title">Open: </span>\n  <span class="tp__body__value">' + open + '</span><br/>\n  <span class="tp__body__title">High: </span>\n  <span class="tp__body__value">' + dayHigh + '</span><br/>\n  <span class="tp__body__title">Low: </span>\n  <span class="tp__body__value">' + dayLow + '</span><br/>\n  <span class="tp__body__title">Close: </span>\n  <span class="tp__body__value">' + close + '</span>\n  </div>');
};
var _fnCategoryAreaRange = function _fnCategoryAreaRange(_ref8) {
  var id = _ref8.id,
      point = _ref8.point;
  var high = point.high,
      low = point.low,
      c = point.c;

  return _fnTooltipHeader(c, id) + ('<div class="tp__body">\n  <span class="tp__body__title">High: </span>\n  <span class="tp__body__value">' + high + '</span><br/>\n  <span class="tp__body__title">Low: </span>\n  <span class="tp__body__value">' + low + '</span>\n  </div>');
};
var _fnCategory = function _fnCategory(_ref9) {
  var id = _ref9.id,
      point = _ref9.point;
  var y = point.y,
      c = point.c;

  return _fnTooltipHeader(c, id) + ('<div class="tp__body">\n  <span class="tp__body__title">Value: </span>\n  <span class="tp__body__value">' + y + '</span>\n  </div>');
};

var _fnPieTooltip = function _fnPieTooltip(_ref10) {
  var id = _ref10.id,
      value = _ref10.value,
      point = _ref10.point;

  return _fnTooltipHeader(point.nameFull, id) + ('<div class="tp__body">\n  <span class="tp__body__title">Value: </span>\n  <span class="tp__body__value">' + value + '</span></br>\n  </div>');
};

var _fnCalcWidthSparkType4 = function _fnCalcWidthSparkType4(value, total) {
  var _width1 = WIDTH_VALUE + value.length * WIDTH_CHAR,
      _width2 = WIDTH_TOTAL + total.length * WIDTH_CHAR,
      width = _width1 > _width2 ? _width1 : _width2,
      fullWidth = width + WIDTH_SPARK;
  return { fullWidth: fullWidth, width: width };
};

var _fnStackedAreaTooltip = function _fnStackedAreaTooltip(_ref11) {
  var id = _ref11.id,
      value = _ref11.value,
      point = _ref11.point;

  var nameFull = point.nameFull,
      category = point.category,
      _point$percent = point.percent,
      percent = _point$percent === undefined ? '0.0' : _point$percent,
      _point$total = point.total,
      total = _point$total === undefined ? 0 : _point$total,
      _total = _ChartFn2.default.toNumberFormat(total),
      _fnCalcWidthSparkType = _fnCalcWidthSparkType4(value, _total),
      fullWidth = _fnCalcWidthSparkType.fullWidth,
      width = _fnCalcWidthSparkType.width;

  return _fnTooltipHeader(nameFull, id) + _fnTooltipSparkType4({
    fullWidth: fullWidth, width: width, year: category, value: value, total: _total, percent: percent, id: id
  });
};

var _fnTreeMapTooltip = function _fnTreeMapTooltip(_ref12) {
  var id = _ref12.id,
      point = _ref12.point;

  var nameFull = point.nameFull,
      year = point.year,
      _point$value = point.value,
      value = _point$value === undefined ? '0.0' : _point$value,
      _point$percent2 = point.percent,
      percent = _point$percent2 === undefined ? '0.0' : _point$percent2,
      _point$total2 = point.total,
      total = _point$total2 === undefined ? 0 : _point$total2,
      _value = _ChartFn2.default.toNumberFormat(value),
      _total = _ChartFn2.default.toNumberFormat(total),
      _fnCalcWidthSparkType2 = _fnCalcWidthSparkType4(_value, _total),
      fullWidth = _fnCalcWidthSparkType2.fullWidth,
      width = _fnCalcWidthSparkType2.width;

  return _fnTooltipHeader(nameFull, id) + _fnTooltipSparkType4({
    fullWidth: fullWidth, width: width, year: year, value: _value, total: _total, percent: percent, id: id
  });
};

var _fHide = function _fHide(id, point) {
  return function _fnHide() {
    document.getElementById(id).removeEventListener('click', _fnHide);
    point.series.chart.zhTooltip.hide();
  };
};

var _fnAddHandlerClose = function _fnAddHandlerClose(id, point) {
  setTimeout(function () {
    document.getElementById(id).addEventListener('click', _fHide(id, point));
  }, 1);
};

var _fnAddHandlerCloseAndSparklines = function _fnAddHandlerCloseAndSparklines(id, point) {
  setTimeout(function () {
    document.getElementById(id).addEventListener('click', _fHide(id, point));

    var sparkLinesData = [],
        sparkBarsData = [],
        pointIndex = void 0;

    if (point.sparkvalues) {
      sparkLinesData = point.sparkvalues;
      sparkBarsData = point.sparkpercent;
      pointIndex = point.sparkvalues.length !== 0 ? point.sparkvalues.length - 1 : 0;
    } else {
      var seriesData = point.series.data;
      seriesData.forEach(function (item, itemIndex) {
        sparkLinesData.push(item.y);
        sparkBarsData.push(item.percentage);
      });
      pointIndex = point.index;
    }

    var sparklines = _SparkFactory2.default.createSparklines(sparkLinesData, pointIndex),
        sparkbars = _SparkFactory2.default.createSparkbars(sparkBarsData, pointIndex);
    (0, _reactDom.render)(sparklines, document.getElementById(id + '_' + SPARKLINES_SUFFIX_ID));
    (0, _reactDom.render)(sparkbars, document.getElementById(id + '_' + SPARKLINES_BAR_SUFFIX_ID));
  }, 1);
};

var _fnDateFormatDMY = _highcharts2.default.dateFormat.bind(null, '%A, %b %d, %Y');
var _fnDateFormatDMYT = _highcharts2.default.dateFormat.bind(null, '%A, %b %d, %Y, %H:%M');
var _fnFormatCategory = function _fnFormatCategory(x) {
  return x;
};

var _fnBasePointFormatter = function _fnBasePointFormatter(option) {
  return function () {
    var fnTemplate = option.fnTemplate,
        _option$onAfterRender = option.onAfterRender,
        onAfterRender = _option$onAfterRender === undefined ? _fnAddHandlerClose : _option$onAfterRender,
        _option$fnDateFormat = option.fnDateFormat,
        fnDateFormat = _option$fnDateFormat === undefined ? _fnDateFormatDMY : _option$fnDateFormat,
        isWithColor = option.isWithColor,
        isWithValueText = option.isWithValueText,
        isWithValue = option.isWithValue,
        point = this,
        series = point.series,
        date = fnDateFormat(point.x),
        color = isWithColor ? point.color || series.color : undefined,
        _series$userOptions = series.userOptions,
        zhValueText = _series$userOptions.zhValueText,
        _series$userOptions$n = _series$userOptions.name,
        name = _series$userOptions$n === undefined ? 'Value' : _series$userOptions$n,
        id = _series$userOptions.id,
        zhSeriaId = _series$userOptions.zhSeriaId,
        _id = zhSeriaId || id || 'TP',
        valueText = isWithValueText ? zhValueText || name : 'Value',
        value = isWithValue ? _ChartFn2.default.toNumberFormat(point.y) : null;

    onAfterRender(_id, point);

    return fnTemplate({ id: _id, date: date, color: color, valueText: valueText, value: value, point: point });
  };
};

var Tooltip = {
  fnBasePointFormatter: _fnBasePointFormatter({
    fnTemplate: _fnBaseTooltip,
    isWithColor: true, isWithValueText: true, isWithValue: true
  }),
  fnBasePointFormatterT: _fnBasePointFormatter({
    fnTemplate: _fnBaseTooltip,
    fnDateFormat: _fnDateFormatDMYT,
    isWithColor: true, isWithValueText: true, isWithValue: true
  }),
  fnBasePointFormatterC: _fnBasePointFormatter({
    fnTemplate: _fnBaseTooltip,
    fnDateFormat: _fnFormatCategory,
    isWithColor: true, isWithValueText: true, isWithValue: true
  }),
  category: _fnBasePointFormatter({
    fnTemplate: _fnCategory
  }),

  fnExDividendPointFormatter: _fnBasePointFormatter({
    fnTemplate: _fnExDividend
  }),
  fnSplitRatioPointFormatter: _fnBasePointFormatter({
    fnTemplate: _fnSplitRatio
  }),

  fnVolumePointFormatter: _fnBasePointFormatter({
    fnTemplate: _fnVolumeTooltip, isWithValue: true
  }),
  fnVolumePointFormatterT: _fnBasePointFormatter({
    fnTemplate: _fnVolumeTooltip,
    fnDateFormat: _fnDateFormatDMYT,
    isWithValue: true
  }),

  fnATHPointFormatter: _fnBasePointFormatter({
    fnTemplate: _fnATHTooltip
  }),
  fnHighLowPointFormatter: _fnBasePointFormatter({
    fnTemplate: _fnHighLowTooltip
  }),
  categoryAreaRange: _fnBasePointFormatter({
    fnTemplate: _fnCategoryAreaRange
  }),
  fnPiePointFormatter: _fnBasePointFormatter({
    fnTemplate: _fnPieTooltip, isWithValue: true
  }),
  fnStackedAreaPointFormatter: _fnBasePointFormatter({
    fnTemplate: _fnStackedAreaTooltip,
    onAfterRender: _fnAddHandlerCloseAndSparklines,
    isWithValue: true
  }),
  fnTreeMapPointFormatter: _fnBasePointFormatter({
    fnTemplate: _fnTreeMapTooltip,
    onAfterRender: _fnAddHandlerCloseAndSparklines,
    isWithValue: true
  })
};

exports.default = Tooltip;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\charts\Tooltip.js.map