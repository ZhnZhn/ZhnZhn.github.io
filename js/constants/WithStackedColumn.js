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
  fBaseStackedColumnConfig: function fBaseStackedColumnConfig() {
    return {
      zhSeries: {
        count: 0
      },
      zhDetailCharts: [],

      chart: {
        type: 'column',
        spacingTop: _Chart2.default.SPACING_TOP,
        spacingBottom: _Chart2.default.SPACING_BOTTOM,

        zoomType: 'xy',
        resetZoomButton: {
          position: {
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 48
          },
          relativeTo: 'chart'
        }
      },

      title: _Chart2.default.fTitle({ y: 40 }),
      subtitle: _Chart2.default.fSubtitle({ y: 60 }),

      /*
      xAxis : {
        categories : []
      },
      */

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

      yAxis: {
        opposite: true,
        title: {
          text: ''
        }
      },

      tooltip: {
        pointFormatter: _Tooltip2.default.fnStackedAreaPointFormatter,
        headerFormat: ''
      },

      plotOptions: {
        column: {
          stacking: 'normal',
          lineColor: 'yellow',
          lineWidth: 0,
          marker: {
            enabled: false,
            lineWidth: 1,
            lineColor: '#a487d4'
          },
          state: {
            hover: {
              lineWidth: 2
            },
            halo: {
              opacity: 0.25,
              size: 10
            }
          }
        }
      },
      legend: {
        itemStyle: {
          color: 'black',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'normal'
        }
      }
    };
  },
  fStackedColumnSeria: function fStackedColumnSeria(_ref) {
    var zhSeriaId = _ref.zhSeriaId;
    var name = _ref.name;
    var _ref$data = _ref.data;
    var data = _ref$data === undefined ? [] : _ref$data;
    var _ref$color = _ref.color;
    var color = _ref$color === undefined ? 'gray' : _ref$color;

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