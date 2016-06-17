'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _highcharts = require('highcharts');

var _highcharts2 = _interopRequireDefault(_highcharts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Tooltip = {};

var _fnNumberFormat = function _fnNumberFormat(value) {
  var arrSplit = (value + '').split('.'),
      decimal = arrSplit[1] ? 2 : 0;
  return _highcharts2.default.numberFormat(value, decimal, '.', ' ');
};

var _fnTooltipHeader = function _fnTooltipHeader(date, id) {
  var cssClass = arguments.length <= 2 || arguments[2] === undefined ? '' : arguments[2];

  return '<div id="' + id + '" class="tp__header not-selected ' + cssClass + '">\n  <span class="tp__header__caption">' + date + '</span>\n  <span class="tp__header__close">X</span>\n  </div>';
};

var _fnBaseTooltip = function _fnBaseTooltip(_ref) {
  var date = _ref.date;
  var id = _ref.id;
  var valueText = _ref.valueText;
  var value = _ref.value;

  return _fnTooltipHeader(date, id) + ('<div class="tp__body">\n  <span class="tp__body__title">' + valueText + ':&nbsp;</span>\n  <span class="tp__body__value">' + value + '</span>\n  </div>');
};

var _fnExDividend = function _fnExDividend(_ref2) {
  var date = _ref2.date;
  var id = _ref2.id;
  var valueText = _ref2.valueText;
  var value = _ref2.value;
  var point = _ref2.point;

  return _fnTooltipHeader(date, id) + ('<div class="tp__body">\n  <span class="tp__body__title">Ex-Dividend: </span>\n  <span style="color: green;">' + point.exValue + '</span><br/>\n  <span class="tp__body__title">Stock Price: </span>\n  <span class="tp__body__value">' + point.price + '</span>\n  </div>');
};

var _fnSplitRatio = function _fnSplitRatio(_ref3) {
  var date = _ref3.date;
  var id = _ref3.id;
  var valueText = _ref3.valueText;
  var value = _ref3.value;
  var point = _ref3.point;

  return _fnTooltipHeader(date, id) + ('<div class="tp__body">\n  <span class="tp__body__title">Split Ratio: </span>\n  <span style="color: #ED5813;">' + point.splitRatio + '</span><br/>\n  <span class="tp__body__title">Stock Price: </span>\n  <span class="tp__body__value">' + point.price + '</span>\n  </div>');
};

var _fnVolumeTooltip = function _fnVolumeTooltip(_ref4) {
  var date = _ref4.date;
  var id = _ref4.id;
  var value = _ref4.value;
  var point = _ref4.point;

  return _fnTooltipHeader(date, id) + ('<div class="tp__body">\n  <span class="tp__body__title">Volume: </span>\n  <span class="tp__body__value">' + value + '</span><br/>\n  <span class="tp__body__title">Open: </span>\n  <span class="tp__body__value">' + point.open + '</span>\n  <span class="tp__body__title"> Close: </span>\n  <span class="tp__body__value">' + point.close + '</span><br/>\n  <span class="tp__body__title">Low: </span>\n  <span class="tp__body__value">' + point.low + '</span>\n  <span class="tp__body__title"> High: </span>\n  <span class="tp__body__value">' + point.high + '</span>\n  </div>');
};

var _fnATHTooltip = function _fnATHTooltip(_ref5) {
  var date = _ref5.date;
  var id = _ref5.id;
  var value = _ref5.value;
  var point = _ref5.point;

  return _fnTooltipHeader(date, id) + ('<div class="tp__body">\n   <span class="tp__body__title">ATH: </span>\n   <span class="tp__body__value">' + point.y + '%</span><br/>\n   <span class="tp__body__title">Close: </span>\n   <span class="tp__body__value">' + point.close + '</span>\n   <span class="tp__body__title"> Open: </span>\n   <span class="tp__body__value">' + point.open + '</span><br/>\n   </div>');
};

var _fnHighLowTooltip = function _fnHighLowTooltip(_ref6) {
  var date = _ref6.date;
  var id = _ref6.id;
  var value = _ref6.value;
  var point = _ref6.point;

  return _fnTooltipHeader(date, id) + ('<div class="tp__body">\n  <span class="tp__body__title">Day High: </span>\n  <span class="tp__body__value">' + point.dayHigh + '</span></br>\n  <span class="tp__body__title">Day Low: </span>\n  <span class="tp__body__value">' + point.dayLow + '</span></br>\n  <span class="tp__body__title">Close: </span>\n  <span class="tp__body__value">' + point.close + '</span>\n  </div>');
};

var _fnPieTooltip = function _fnPieTooltip(_ref7) {
  var id = _ref7.id;
  var value = _ref7.value;
  var point = _ref7.point;

  return _fnTooltipHeader(point.nameFull, id, 'tp--fs16') + ('<div class="tp__body tp--fs16">\n  <span class="tp__body__title">Value: </span>\n  <span class="tp__body__value">' + value + '</span></br>\n  </div>');
};

var _fnStackedAreaTooltip = function _fnStackedAreaTooltip(_ref8) {
  var id = _ref8.id;
  var value = _ref8.value;
  var point = _ref8.point;
  var nameFull = point.nameFull;
  var category = point.category;
  var _point$percent = point.percent;
  var percent = _point$percent === undefined ? '0.0' : _point$percent;
  var _point$total = point.total;
  var total = _point$total === undefined ? 0 : _point$total;

  return _fnTooltipHeader(nameFull, id, 'tp--fs16') + ('<div class="tp__body tp--fs16">\n  <span class="tp__body__title">Year: </span>\n  <span class="tp__body__value">' + category + '</span></br>\n  <span class="tp__body__title">Value: </span>\n  <span class="tp__body__value">' + value + '</span></br>\n  <span class="tp__body__title">Percent: </span>\n  <span class="tp__body__value">' + percent + '</span></br>\n  <span class="tp__body__title">Total: </span>\n  <span class="tp__body__value">' + _fnNumberFormat(total) + '</span></br>\n  </div>');
};

var _fnTreeMapTooltip = function _fnTreeMapTooltip(_ref9) {
  var id = _ref9.id;
  var point = _ref9.point;
  var nameFull = point.nameFull;
  var year = point.year;
  var _point$value = point.value;
  var value = _point$value === undefined ? '0.0' : _point$value;
  var _point$percent2 = point.percent;
  var percent = _point$percent2 === undefined ? '0.0' : _point$percent2;
  var _point$total2 = point.total;
  var total = _point$total2 === undefined ? 0 : _point$total2;

  return _fnTooltipHeader(nameFull, id, 'tp--fs16') + ('<div class="tp__body tp--fs16">\n  <span class="tp__body__title">Year: </span>\n  <span class="tp__body__value">' + year + '</span></br>\n  <span class="tp__body__title">Value: </span>\n  <span class="tp__body__value">' + _fnNumberFormat(value) + '</span></br>\n  <span class="tp__body__title">Percent: </span>\n  <span class="tp__body__value">' + percent + '</span></br>\n  <span class="tp__body__title">Total: </span>\n  <span class="tp__body__value">' + _fnNumberFormat(total) + '</span></br>\n  </div>');
};

var _fnAddHandlerClose = function _fnAddHandlerClose(id, point) {
  setTimeout(function () {
    document.getElementById(id).addEventListener('click', function _fnHide() {
      document.getElementById(id).removeEventListener('click', _fnHide);
      point.series.chart.zhTooltip.hide();
    });
  }, 1);
};

var _fnBasePointFormatter = function _fnBasePointFormatter(fnTemplate, isWithValueText, isWithValue) {
  return function () {
    var point = this,
        id = point.series.options.zhSeriaId,
        date = _highcharts2.default.dateFormat('%A, %b %d, %Y', point.x),
        valueText = isWithValueText ? point.series.userOptions.zhValueText : null,
        value = isWithValue ? _fnNumberFormat(point.y) : null;

    _fnAddHandlerClose(id, point);

    return fnTemplate({ date: date, id: id, valueText: valueText, value: value, point: point });
  };
};

Tooltip.fnBasePointFormatter = _fnBasePointFormatter(_fnBaseTooltip, true, true);
Tooltip.fnExDividendPointFormatter = _fnBasePointFormatter(_fnExDividend, false, false);
Tooltip.fnSplitRatioPointFormatter = _fnBasePointFormatter(_fnSplitRatio, false, false);

Tooltip.fnVolumePointFormatter = _fnBasePointFormatter(_fnVolumeTooltip, false, true);
Tooltip.fnATHPointFormatter = _fnBasePointFormatter(_fnATHTooltip, false, false);
Tooltip.fnHighLowPointFormatter = _fnBasePointFormatter(_fnHighLowTooltip, false, false);

Tooltip.fnPiePointFormatter = _fnBasePointFormatter(_fnPieTooltip, false, true);
Tooltip.fnStackedAreaPointFormatter = _fnBasePointFormatter(_fnStackedAreaTooltip, false, true);
Tooltip.fnTreeMapPointFormatter = _fnBasePointFormatter(_fnTreeMapTooltip, false, true);

exports.default = Tooltip;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\constants\Tooltip.js.map