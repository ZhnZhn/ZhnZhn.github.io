"use strict";

exports.__esModule = true;
exports.crPieConfig = exports.crOuterPieSeria = exports.crInnerPieSeria = void 0;
var _ChartFn = require("./ChartFn");
var _Chart = require("./Chart");
var _Tooltip = require("./Tooltip");
var _CL = require("./CL");
const crPieConfig = () => ({
  zhSeries: {
    count: 0
  },
  zhDetailCharts: [],
  credits: (0, _Chart.fCreditsRightBottom)(),
  title: (0, _Chart.fTitle)({
    y: _Chart.SEMIDONUT_TITLE_Y
  }),
  subtitle: (0, _Chart.fSubtitle)({
    y: _Chart.SEMIDONUT_SUBTITLE_Y
  }),
  legend: (0, _Chart.fLegend)(),
  navigation: (0, _Chart.fNavigation)()
});
exports.crPieConfig = crPieConfig;
const crInnerPieSeria = _ref => {
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
      name: `<span class="${_CL.CL_TP_TITLE}">${year}</span><br/>${bTotal.toString()}`,
      y: 1
    }],
    dataLabels: {
      enabled: true,
      distance: -70,
      style: {
        fontWeight: 'bold',
        fontSize: '18px',
        color: (0, _ChartFn.getColorBlack)(),
        textShadow: 'none;'
      }
    }
  };
};
exports.crInnerPieSeria = crInnerPieSeria;
const crOuterPieSeria = _ref2 => {
  let {
    center,
    data,
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
      enabled: false,
      distance: -5
    },
    tooltip: (0, _Chart.fTooltip)(_Tooltip.tooltipDonut)
  };
};
exports.crOuterPieSeria = crOuterPieSeria;
//# sourceMappingURL=PieConfigFn.js.map