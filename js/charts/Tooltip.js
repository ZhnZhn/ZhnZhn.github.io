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

//const formatNumber = ChartConfig.fnNumberFormat;

//import ChartConfig from './ChartConfig'
var C = {
  TITLE_C: '#a487d4',
  YEAR_C: '#fdb316',
  VALUE_C: '#2f7ed8',
  EX_DIVIDEND_C: 'green'
};
var TITLE_STYLE = 'style="color:' + C.TITLE_C + ';"';

var _numberFormat = function _numberFormat(value) {
  var arrSplit = (value + '').split('.'),
      decimal = arrSplit[1] ? arrSplit[1].length : 0;
  return _highcharts2.default.numberFormat(value, decimal, '.', ' ');
};

var _crSpan = function _crSpan() {
  var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var v = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

  var _ref = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
      _ref$color = _ref.color,
      color = _ref$color === undefined ? C.VALUE_C : _ref$color;

  var _vStyle = 'style="color:' + color + ';"';
  return '\n  <span ' + TITLE_STYLE + '>' + t + ': </span>\n  <span ' + _vStyle + '>' + v + '</span>';
};
var _crRow = function _crRow() {
  var t = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
  var v = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var option = arguments[2];

  return '<div>' + _crSpan(t, v, option) + '</div>';
};

var _crHeader = function _crHeader(date, id) {
  var cssClass = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

  return '<div id="' + id + '" class="tp__header not-selected ' + cssClass + '">\n    <span class="tp__header__caption">' + date + '</span>\n    <span class="tp__header__close">X</span>\n  </div>';
};

var _fnTooltipSparkType4 = function _fnTooltipSparkType4(_ref2) {
  var fullWidth = _ref2.fullWidth,
      width = _ref2.width,
      year = _ref2.year,
      value = _ref2.value,
      total = _ref2.total,
      percent = _ref2.percent,
      id = _ref2.id;

  var _style = 'style="float:left;padding-right:10px;width:' + width + 'px;"';
  return '<div class="tp__body">\n  <div class="tp__body__part1" style="width:' + fullWidth + 'px;" >\n    <div ' + _style + '>\n      ' + _crRow('Year', year, { color: C.YEAR_C }) + '\n      ' + _crRow('Value', value) + '\n    </div>\n    <div id="' + id + '_' + SPARKLINES_SUFFIX_ID + '" class="tp__body__sparklines">\n    </div>\n  </div>\n  <div class="tp__body__part1" style="width:' + fullWidth + 'px;" >\n    <div ' + _style + '>\n      ' + _crRow('Total', total) + '\n      ' + _crRow('Percent', percent) + '\n    </div>\n    <div id="' + id + '_' + SPARKLINES_BAR_SUFFIX_ID + '" class="tp__body__sparklines">\n    </div>\n  </div>';
};

var _fnBaseTooltip = function _fnBaseTooltip(_ref3) {
  var date = _ref3.date,
      id = _ref3.id,
      color = _ref3.color,
      _ref3$valueText = _ref3.valueText,
      valueText = _ref3$valueText === undefined ? 'Value' : _ref3$valueText,
      value = _ref3.value;

  return _crHeader(date, id) + '\n  <div class="tp__body">\n    ' + _crRow(valueText, value, { color: color }) + '\n  </div>';
};

var _fnExDividend = function _fnExDividend(_ref4) {
  var date = _ref4.date,
      id = _ref4.id,
      valueText = _ref4.valueText,
      value = _ref4.value,
      point = _ref4.point;
  var exValue = point.exValue,
      price = point.price;

  return _crHeader(date, id) + '\n  <div class="tp__body">\n    ' + _crRow('Ex-Dividend', exValue, { color: '#90ed7d' }) + '\n    ' + _crRow('Close', price) + '\n  </div>';
};

var _fnSplitRatio = function _fnSplitRatio(_ref5) {
  var date = _ref5.date,
      id = _ref5.id,
      valueText = _ref5.valueText,
      value = _ref5.value,
      point = _ref5.point;
  var splitRatio = point.splitRatio,
      price = point.price;

  return _crHeader(date, id) + '\n  <div class="tp__body">\n    ' + _crRow('Split Ratio', splitRatio, { color: '#ED5813' }) + '\n    ' + _crRow('Close', price) + '\n  </div>';
};

var _fnVolumeTooltip = function _fnVolumeTooltip(_ref6) {
  var date = _ref6.date,
      id = _ref6.id,
      value = _ref6.value,
      point = _ref6.point;

  var _point$_open = point._open,
      _open = _point$_open === undefined ? 'NoData' : _point$_open,
      _point$_close = point._close,
      _close = _point$_close === undefined ? '' : _point$_close,
      _point$_low = point._low,
      _low = _point$_low === undefined ? '' : _point$_low,
      _point$_high = point._high,
      _high = _point$_high === undefined ? '' : _point$_high;

  return _crHeader(date, id) + '\n  <div class="tp__body">\n    ' + _crRow('Volume', value) + '\n    <div>\n      ' + _crSpan('Open', _open) + '\n      ' + _crSpan('Close', _close) + '\n    </div>\n    <div>\n      ' + _crSpan('Low', _low) + '\n      ' + _crSpan('High', _high) + '\n    </div>\n  </div>';
};

var _fnATHTooltip = function _fnATHTooltip(_ref7) {
  var date = _ref7.date,
      id = _ref7.id,
      value = _ref7.value,
      point = _ref7.point;
  var color = point.color,
      y = point.y,
      close = point.close,
      open = point.open;

  return _crHeader(date, id) + '\n    <div class="tp__body">\n      ' + _crRow('ATH', y + '%', { color: color }) + '\n      ' + _crRow('Prev Close', close) + '\n      ' + _crRow('Next Open', open) + '\n    </div>';
};

var _fnHighLowTooltip = function _fnHighLowTooltip(_ref8) {
  var date = _ref8.date,
      id = _ref8.id,
      value = _ref8.value,
      point = _ref8.point;
  var open = point.open,
      dayHigh = point.dayHigh,
      dayLow = point.dayLow,
      close = point.close;

  return _crHeader(date, id) + '\n  <div class="tp__body">\n    ' + _crRow('Open', open) + '\n    ' + _crRow('High', dayHigh) + '\n    ' + _crRow('Low', dayLow) + '\n    ' + _crRow('Close', close) + '\n  </div>';
};
var _fnCategoryRHLY = function _fnCategoryRHLY(_ref9) {
  var id = _ref9.id,
      point = _ref9.point;
  var high = point.high,
      yHigh = point.yHigh,
      low = point.low,
      yLow = point.yLow,
      c = point.c;

  return _crHeader(c, id) + '\n  <div class="tp__body">\n    <div>\n      ' + _crSpan('High', high) + '\n      ' + _crSpan('', yHigh, { color: C.YEAR_C }) + '\n    </div>\n    <div>\n      ' + _crSpan('&nbsp;Low', low) + '\n      ' + _crSpan('', yLow, { color: C.YEAR_C }) + '\n    </div>\n  </div>';
};

var _fnCategory = function _fnCategory(_ref10) {
  var id = _ref10.id,
      point = _ref10.point;
  var y = point.y,
      c = point.c;

  return _crHeader(c, id) + '\n  <div class="tp__body">\n    ' + _crRow('Value', _numberFormat(y)) + '\n  </div>';
};

var _fnPieTooltip = function _fnPieTooltip(_ref11) {
  var id = _ref11.id,
      value = _ref11.value,
      point = _ref11.point;

  return _crHeader(point.nameFull, id) + '\n  <div class="tp__body">\n    ' + _crRow('Value', value) + '\n  </div>';
};

var _fnCalcWidthSparkType4 = function _fnCalcWidthSparkType4(value, total) {
  var _width1 = WIDTH_VALUE + value.length * WIDTH_CHAR,
      _width2 = WIDTH_TOTAL + total.length * WIDTH_CHAR,
      width = _width1 > _width2 ? _width1 : _width2,
      fullWidth = width + WIDTH_SPARK;
  return { fullWidth: fullWidth, width: width };
};

var _fnStackedAreaTooltip = function _fnStackedAreaTooltip(_ref12) {
  var id = _ref12.id,
      value = _ref12.value,
      point = _ref12.point;

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

  return _crHeader(nameFull, id) + _fnTooltipSparkType4({
    fullWidth: fullWidth, width: width, year: category, value: value, total: _total, percent: percent, id: id
  });
};

var _fnTreeMapTooltip = function _fnTreeMapTooltip(_ref13) {
  var id = _ref13.id,
      point = _ref13.point;

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

  return _crHeader(nameFull, id) + _fnTooltipSparkType4({
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

var _crSparkData = function _crSparkData(point) {
  var sparkvalues = point.sparkvalues,
      sparkpercent = point.sparkpercent;

  var sparkLinesData = [],
      sparkBarsData = [],
      pointIndex = void 0;

  if (sparkvalues) {
    sparkLinesData = sparkvalues;
    sparkBarsData = sparkpercent;
    pointIndex = sparkvalues.length !== 0 ? sparkvalues.length - 1 : 0;
  } else {
    var seriesData = point.series.data;
    seriesData.forEach(function (item, itemIndex) {
      sparkLinesData.push(item.y);
      sparkBarsData.push(item.percentage);
    });
    pointIndex = point.index;
  }
  return { sparkLinesData: sparkLinesData, sparkBarsData: sparkBarsData, pointIndex: pointIndex };
};

var _fnAddHandlerCloseAndSparklines = function _fnAddHandlerCloseAndSparklines(id, point) {
  setTimeout(function () {
    document.getElementById(id).addEventListener('click', _fHide(id, point));

    var _crSparkData2 = _crSparkData(point),
        sparkLinesData = _crSparkData2.sparkLinesData,
        sparkBarsData = _crSparkData2.sparkBarsData,
        pointIndex = _crSparkData2.pointIndex,
        sparklines = _SparkFactory2.default.createSparklines(sparkLinesData, pointIndex),
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
  categoryRHLY: _fnBasePointFormatter({
    fnTemplate: _fnCategoryRHLY
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