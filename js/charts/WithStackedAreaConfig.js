'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Chart = require('./Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _Tooltip = require('./Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WithStackAreaConfig = {
  fBaseStackAreaConfig: function fBaseStackAreaConfig(_ref) {
    var _ref$stacking = _ref.stacking;
    var stacking = _ref$stacking === undefined ? 'normal' : _ref$stacking;

    return {
      zhSeries: {
        count: 0
      },
      zhDetailCharts: [],

      credits: _Chart2.default.fCreditsRightBottom(),
      chart: {
        type: 'area',
        spacingTop: _Chart2.default.STACKED_SPACING_TOP,
        spacingBottom: _Chart2.default.SPACING_BOTTOM,

        zoomType: 'xy',
        resetZoomButton: _Chart2.default.fResetZoomButton()
      },
      title: _Chart2.default.fTitle({ y: _Chart2.default.STACKED_TITLE_Y }),
      subtitle: _Chart2.default.fSubtitle({ y: _Chart2.default.STACKED_SUBTITLE_Y }),
      tooltip: _Chart2.default.fTooltip(_Tooltip2.default.fnStackedAreaPointFormatter),

      xAxis: _Chart2.default.fXAxisOpposite({
        categories: [],
        startOnTick: false,
        min: 1,
        crosshair: _Chart2.default.fCrosshair()
      }),
      yAxis: _Chart2.default.fYAxisOpposite(),

      plotOptions: {
        area: _Chart2.default.fPlotOptionsArea({ stacking: stacking }),
        series: _Chart2.default.fPlotOptionsSeries()
      },
      legend: _Chart2.default.fLegend()
    };
  },
  fStackAreaSeria: function fStackAreaSeria(_ref2) {
    var zhSeriaId = _ref2.zhSeriaId;
    var name = _ref2.name;
    var _ref2$data = _ref2.data;
    var data = _ref2$data === undefined ? [] : _ref2$data;
    var _ref2$color = _ref2.color;
    var color = _ref2$color === undefined ? 'gray' : _ref2$color;

    return {
      zhSeriaId: zhSeriaId,
      name: name,
      data: data,
      color: color,
      fillColor: color,
      fillOpacity: 0.5,
      marker: {
        radius: 6,
        symbol: 'circle'
      }
    };
  }
};

exports.default = WithStackAreaConfig;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\charts\WithStackedAreaConfig.js.map