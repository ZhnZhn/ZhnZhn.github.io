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
      decimal = arrSplit[1] ? arrSplit[1].length : 0;

  return _highcharts2.default.numberFormat(value, decimal, '.', ' ');
};

var _fnBaseTooltip = function _fnBaseTooltip(date, id, valueText, value) {
  return '<div id="' + id + '" class="not-selected" style="padding-bottom:5px; cursor: pointer;">\n  <span style="font-weight: bold; font-size: 12px; color:rgba(194,149,23,1);">' + date + '</span>\n  <span style="display: inline-block; margin-left: 10px; color: #ED5813;">X</span>\n  </div>\n  <span style="color:rgba(69, 114, 167, 1);font-weight:bold;">' + valueText + ': </span>\n  <span style="font-weight: bold; color:rgba(194,149,23,1);">' + value + '</span><br/>';
};

var _fnExDividend = function _fnExDividend(date, id, valueText, value, point) {
  return '<div id="' + id + '" class="not-selected" style="padding-bottom:5px; cursor: pointer;">\n  <span style="font-weight: bold; font-size: 12px; color:rgba(194,149,23,1);">' + date + '</span>\n  <span style="display: inline-block; margin-left: 10px; color: #ED5813;">X</span>\n  </div>\n  <span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Ex-Dividend: </span>\n  <span style="font-weight: bold; color: green;">' + point.exValue + '</span><br/>\n  <span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Stock Price: </span>\n  <span style="font-weight: bold; color:rgba(194,149,23,1);">' + point.price + '</span>';
};

var _fnSplitRatio = function _fnSplitRatio(date, id, valueText, value, point) {
  return '<div id="' + id + '" class="not-selected" style="padding-bottom:5px; cursor: pointer;">\n  <span style="font-weight: bold; font-size: 12px; color:rgba(194,149,23,1);">' + date + '</span>\n  <span style="display: inline-block; margin-left: 10px; color: #ED5813;">X</span>\n  </div>\n  <span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Split Ratio: </span>\n  <span style="font-weight: bold; color: #ED5813;">' + point.splitRatio + '</span><br/>\n  <span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Stock Price: </span>\n  <span style="font-weight: bold; color:rgba(194,149,23,1);">' + point.price + '</span>';
};

var _fnVolumeTooltip = function _fnVolumeTooltip(date, id, value, point) {
  return '<div id="' + id + '" class="not-selected" style="padding-bottom:5px; cursor: pointer;">\n  <span style="font-weight: bold; font-size: 12px; color:rgba(194,149,23,1);">' + date + '</span>\n  <span style="display: inline-block; margin-left: 10px; color: #ED5813;">X</span>\n  </div>\n  <span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Volume: </span>\n  <span style="font-weight: bold; color:rgba(194,149,23,1);">' + value + '</span><br/>\n  <span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Open: </span>\n  <span style="font-weight: bold; color:rgba(194,149,23,1);">' + point.open + '</span>\n  <span style="color:rgba(69, 114, 167, 1);font-weight:bold;"> Close: </span>\n  <span style="font-weight: bold; color:rgba(194,149,23,1);">' + point.close + '</span><br/>\n  <span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Low: </span>\n  <span style="font-weight: bold; color:rgba(194,149,23,1);">' + point.low + '</span>\n  <span style="color:rgba(69, 114, 167, 1);font-weight:bold;"> High: </span>\n  <span style="font-weight: bold; color:rgba(194,149,23,1);">' + point.high + '</span><br/>';
};

var _fnATHTooltip = function _fnATHTooltip(date, id, value, point) {
  return '<div id="' + id + '" class="not-selected" style="padding-bottom:5px; cursor:pointer;">\n   <span style="font-weight: bold; font-size: 12px; color:rgba(194,149,23,1);">' + date + '</span>\n   <span style="display: inline-block; margin-left: 10px; color: #ED5813;">X</span>\n   </div>\n   <span style="color:rgba(69, 114, 167, 1);font-weight:bold;">ATH: </span>\n   <span style="font-weight: bold; color:rgba(194,149,23,1);">' + point.y + '%</span><br/>\n   <span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Close: </span>\n   <span style="font-weight: bold; color:rgba(194,149,23,1);">' + point.close + '</span>\n   <span style="color:rgba(69, 114, 167, 1);font-weight:bold;"> Open: </span>\n   <span style="font-weight: bold; color:rgba(194,149,23,1);">' + point.open + '</span><br/>';
};

var _fnHighLowTooltip = function _fnHighLowTooltip(date, id, value, point) {
  return '<div id="' + id + '" class="not-selected" style="padding-bottom:5px; cursor:pointer;">\n  <span style="font-weight: bold; font-size: 12px; color:rgba(194,149,23,1);line-height:1.5;">' + date + '</span>\n  <span style="display: inline-block; margin-left: 10px; color: #ED5813;">X</span>\n  </div>\n  <span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Day High: </span>\n  <span style="font-weight: bold; color:rgba(194,149,23,1);">' + point.dayHigh + '</span></br>\n  <span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Day Low: </span>\n  <span style="font-weight: bold; color:rgba(194,149,23,1);">' + point.dayLow + '</span></br>\n  <span style="color:rgba(69, 114, 167, 1);font-weight:bold;">Close: </span>\n  <span style="font-weight: bold; color:rgba(194,149,23,1);">' + point.close + '</span>';
};

var _fnBasePointFormatter = function _fnBasePointFormatter(fnTemplate, isWithValueText, isWithValue) {
  return function () {
    var point = this,
        valueText = isWithValueText ? this.series.userOptions.zhValueText : null,
        id = this.series.chart.userOptions.chart.zhId,
        date = _highcharts2.default.dateFormat('%A, %b %d, %Y', point.x),
        value = isWithValue ? _fnNumberFormat(point.y) : null;
    setTimeout(function () {
      document.getElementById(id).addEventListener('click', function () {
        point.series.chart.zhTooltip.hide();
      });
    }, 1);
    return fnTemplate(date, id, valueText, value, point);
  };
};

var _fnMetricPointFormatter = function _fnMetricPointFormatter(fnTemplate, isWithValue) {
  return function () {
    var point = this,
        id = point.y,
        date = _highcharts2.default.dateFormat('%A, %b %d, %Y', point.x),
        value = isWithValue ? fnNumberFormat(point.y) : null;
    setTimeout(function () {
      document.getElementById(id).addEventListener('click', function () {
        point.series.chart.zhTooltip.hide();
      });
    }, 1);

    return fnTemplate(date, id, value, point);
  };
};

Tooltip.fnBasePointFormatter = _fnBasePointFormatter(_fnBaseTooltip, true, true);
Tooltip.fnExDividendPointFormatter = _fnBasePointFormatter(_fnExDividend, false, false);
Tooltip.fnSplitRatioPointFormatter = _fnBasePointFormatter(_fnSplitRatio, false, false);
Tooltip.fnVolumePointFormatter = _fnMetricPointFormatter(_fnVolumeTooltip, true);
Tooltip.fnATHPointFormatter = _fnMetricPointFormatter(_fnATHTooltip, false);
Tooltip.fnHighLowPointFormatter = _fnMetricPointFormatter(_fnHighLowTooltip, false);

exports.default = Tooltip;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\constants\Tooltip.js.map