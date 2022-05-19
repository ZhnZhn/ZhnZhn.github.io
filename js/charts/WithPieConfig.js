"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Chart = _interopRequireDefault(require("./Chart"));

var _Tooltip = require("./Tooltip");

const WithPieConfig = {
  crPieConfig: () => ({
    zhSeries: {
      count: 0
    },
    zhDetailCharts: [],
    credits: _Chart.default.fCreditsRightBottom(),
    title: _Chart.default.fTitle({
      y: _Chart.default.SEMIDONUT_TITLE_Y
    }),
    subtitle: _Chart.default.fSubtitle({
      y: _Chart.default.SEMIDONUT_SUBTITLE_Y
    }),
    legend: _Chart.default.fLegend(),
    navigation: _Chart.default.fNavigation()
  }),
  crInnerPieSeria: _ref => {
    let {
      center,
      year,
      bTotal
    } = _ref;
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
  crOuterPieSeria: _ref2 => {
    let {
      center,
      data,
      isDataLabels = false,
      isShowInLegend = false
    } = _ref2;
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
      tooltip: _Chart.default.fTooltip(_Tooltip.tooltipDonut)
    };
  }
};
var _default = WithPieConfig;
exports.default = _default;
//# sourceMappingURL=WithPieConfig.js.map