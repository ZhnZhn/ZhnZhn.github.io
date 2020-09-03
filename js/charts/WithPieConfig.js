"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _Chart = _interopRequireDefault(require("./Chart"));

var _Tooltip = _interopRequireDefault(require("./Tooltip"));

var WithPieConfig = {
  crPieConfig: function crPieConfig() {
    return {
      zhSeries: {
        count: 0
      },
      zhDetailCharts: [],
      credits: _Chart["default"].fCreditsRightBottom(),
      title: _Chart["default"].fTitle({
        y: _Chart["default"].SEMIDONUT_TITLE_Y
      }),
      subtitle: _Chart["default"].fSubtitle({
        y: _Chart["default"].SEMIDONUT_SUBTITLE_Y
      }),
      legend: _Chart["default"].fLegend(),
      navigation: _Chart["default"].fNavigation()
    };
  },
  crInnerPieSeria: function crInnerPieSeria(_ref) {
    var center = _ref.center,
        year = _ref.year,
        bTotal = _ref.bTotal;
    return {
      type: 'pie',
      borderColor: 'transparent',
      colors: ['transparent'],
      center: center,
      //size : '60%',
      size: 250 * 0.6,
      startAngle: -90,
      endAngle: 90,
      data: [{
        name: "<span style=\"color:#a487d4;\">" + year + "</span><br/>" + bTotal.toString(),
        y: 1
      }],
      dataLabels: {
        enabled: true,
        distance: -70,
        style: {
          fontWeight: 'bold',
          fontSize: '18px',
          color: 'black',
          textShadow: 'none;'
        }
      }
    };
  },
  crOuterPieSeria: function crOuterPieSeria(_ref2) {
    var center = _ref2.center,
        data = _ref2.data,
        _ref2$isDataLabels = _ref2.isDataLabels,
        isDataLabels = _ref2$isDataLabels === void 0 ? false : _ref2$isDataLabels,
        _ref2$isShowInLegend = _ref2.isShowInLegend,
        isShowInLegend = _ref2$isShowInLegend === void 0 ? false : _ref2$isShowInLegend;
    return {
      type: 'pie',
      colorByPoint: true,
      allowPointSelect: true,
      borderColor: null,
      center: center,
      //size: '100%',
      size: 250,
      //innerSize: '60%',
      innerSize: 250 * 0.6,
      startAngle: -90,
      endAngle: 90,
      showInLegend: isShowInLegend,
      data: data,
      dataLabels: {
        enabled: isDataLabels,
        distance: -5
      },
      tooltip: _Chart["default"].fTooltip(_Tooltip["default"].donut)
    };
  }
};
var _default = WithPieConfig;
exports["default"] = _default;
//# sourceMappingURL=WithPieConfig.js.map