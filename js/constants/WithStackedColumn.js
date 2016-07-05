'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Chart = require('./Chart');

var _Chart2 = _interopRequireDefault(_Chart);

var _Tooltip = require('./Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var WithStackedColumn = {
  fBaseStackedColumnConfig: function fBaseStackedColumnConfig(_ref) {
    var _ref$stacking = _ref.stacking;
    var stacking = _ref$stacking === undefined ? 'normal' : _ref$stacking;

    return {
      zhSeries: {
        count: 0
      },
      zhDetailCharts: [],

      credits: _Chart2.default.fCreditsRightBottom(),
      chart: {
        type: 'column',
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
        crosshair: {
          color: 'yellow',
          width: 1,
          zIndex: 2
        }
      }),

      yAxis: _Chart2.default.fYAxisOpposite(),

      plotOptions: {
        column: _Chart2.default.fPlotOptionsColumn({ stacking: stacking })
      },
      legend: _Chart2.default.fLegend()
    };
  },
  fStackedColumnSeria: function fStackedColumnSeria(_ref2) {
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
      borderColor: 'transparent',
      borderWidth: 1,
      color: color,
      fillColor: color,
      fillOpacity: 0.5,
      pointPadding: 0.01,
      marker: {
        radius: 6,
        symbol: 'circle'
      },
      dataLabels: {
        enabled: false,
        format: '{point.percent}',
        color: 'black',
        style: {
          textShadow: 'none'
        }
      },
      states: {
        hover: {
          enabled: true,
          borderColor: 'yellow'
        }
      }
    };
  }
};

exports.default = WithStackedColumn;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\constants\WithStackedColumn.js.map