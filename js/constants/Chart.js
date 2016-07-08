'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

var _highcharts = require('highcharts');

var _highcharts2 = _interopRequireDefault(_highcharts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _fnCreateMonoColors = function _fnCreateMonoColors(_ref) {
  var _ref$base = _ref.base1;
  var base1 = _ref$base === undefined ? '#7cb5ec' : _ref$base;
  var _ref$base2 = _ref.base2;
  var base2 = _ref$base2 === undefined ? '#90ed7d' : _ref$base2;

  var colors = [],
      i;

  for (i = 0; i < 4; i += 1) {
    // Start out with a darkened base color (negative brighten), and end
    // up with a much brighter color
    colors.push(_highcharts2.default.Color(base1).brighten((i - 3) / 7).setOpacity(0.75).get());
    //console.log(Highcharts.Color(base1));
  }
  for (i = 0; i < 4; i += 1) {
    colors.push(_highcharts2.default.Color(base2).brighten((i - 3) / 7).setOpacity(0.75).get());
  }
  return colors;
};

var Chart = {
  COLOR_PERIOD: 4 / 7,
  COLOR_LOW_LEVEL: -3 / 7,
  COLOR_OPACITY: 0.75,
  COLOR_BASE1: '#7CB5EC',
  COLOR_BASE2: '#90ED7D',

  HEIGHT: 300,
  STACKED_HEIGHT: 500,
  LEGEND_ROW_HEIGHT: 32,

  THEME_SPACING_TOP: 5,
  SPACING_TOP: 20,
  STACKED_SPACING_TOP: 25,
  SPACING_BOTTOM: 24,
  MARGIN_TOP: 60,
  TREEMAP_MARGIN_TOP: 50,

  STACKED_TITLE_Y: -10,
  STACKED_SUBTITLE_Y: 10,
  TREEMAP_TITLE_Y: 15,
  TREEMAP_SUBTITLE_Y: 35,
  SEMIDONUT_TITLE_Y: 15,
  SEMIDONUT_SUBTITLE_Y: 35,

  _monoColors: _fnCreateMonoColors({}),

  fCreateMonoColor: function fCreateMonoColor() {
    var base = arguments.length <= 0 || arguments[0] === undefined ? '#7CB5EC' : arguments[0];
    var deltaColor = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
    var opacity = arguments.length <= 2 || arguments[2] === undefined ? 0.75 : arguments[2];

    return _highcharts2.default.Color(base).brighten(this.COLOR_LOW_LEVEL + deltaColor).setOpacity(opacity).get();
  },
  fnGetMonoColor: function fnGetMonoColor(index) {
    var colorIndex = index % 8;
    return this._monoColors[colorIndex];
  },
  fCreditsRightBottom: function fCreditsRightBottom() {
    var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return (0, _merge2.default)({
      enabled: true,
      position: {
        align: 'right',
        x: -10,
        verticalAlign: 'bottom',
        y: -5
      }
    }, option);
  },
  fResetZoomButton: function fResetZoomButton() {
    var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return (0, _merge2.default)({
      position: {
        align: 'right',
        verticalAlign: 'top',
        x: 0,
        y: 0
      },
      relativeTo: 'chart'
    }, option);
  },
  fTitle: function fTitle() {
    var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return (0, _merge2.default)({
      text: '',
      floating: true,
      align: 'left',
      x: 25,
      y: 25,
      style: {
        fontFamily: '"Roboto", "Arial", "Lato", sans-serif',
        color: '#a487d4',
        fontSize: '16px',
        fontWeight: 'bold'
      }
    }, option);
  },
  fSubtitle: function fSubtitle() {
    var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return (0, _merge2.default)({
      text: '',
      floating: true,
      align: 'left',
      x: 25,
      y: 45,
      style: {
        color: 'black',
        fontFamily: '"Roboto", "Arial", "Lato", sans-serif',
        fontSize: '16px',
        fontWeight: 'bold'
      }
    }, option);
  },
  fTooltip: function fTooltip(fnPointFormatter) {
    return {
      pointFormatter: fnPointFormatter,
      headerFormat: ''
    };
  },
  fXAxisOpposite: function fXAxisOpposite() {
    var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return (0, _merge2.default)({
      opposite: true,
      tickLength: 0,
      tickPosition: 'inside',
      labels: {
        y: -5
      }
    }, option);
  },
  fYAxisOpposite: function fYAxisOpposite() {
    var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return (0, _merge2.default)({
      opposite: true,
      title: {
        text: ''
      }
    }, option);
  },
  calcMinY: function calcMinY(_ref2) {
    var minPoint = _ref2.minPoint;
    var maxPoint = _ref2.maxPoint;

    return minPoint - (maxPoint - minPoint) * 30 / 180;
  },
  fPlotOptionsArea: function fPlotOptionsArea() {
    var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return (0, _merge2.default)({
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
    }, option);
  },
  fPlotOptionsColumn: function fPlotOptionsColumn() {
    var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return (0, _merge2.default)({
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
    }, option);
  },
  fLegend: function fLegend() {
    var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return (0, _merge2.default)({
      //itemMarginBottom : 5,
      symbolHeight: 14,
      symbolWidth: 14,
      symbolRadius: 7,
      useHTML: true,
      itemStyle: {
        color: 'black',
        cursor: 'pointer',
        fontSize: '16px',
        fontFamily: '"Roboto", "Arial", "Lato", sans-serif',
        fontWeight: 'bold',
        lineHeight: 1.5
      }
    }, option);
  }
};

exports.default = Chart;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\constants\Chart.js.map