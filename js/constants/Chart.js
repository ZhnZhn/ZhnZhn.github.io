'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

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
  HEIGHT: 300,
  LEGEND_ROW_HEIGHT: 32,

  SPACING_TOP: 20,
  SPACING_BOTTOM: 24,

  _monoColors: _fnCreateMonoColors({}),

  fnGetMonoColor: function fnGetMonoColor(index) {
    var colorIndex = index % 8;
    return this._monoColors[colorIndex];
  },
  fTitle: function fTitle() {
    var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return (0, _lodash.merge)({
      text: '',
      floating: true,
      align: 'left',
      x: 25,
      y: 25,
      style: {
        color: '#a487d4',
        fontSize: '16px',
        fontWeight: 'bold'
      }
    }, option);
  },
  fSubtitle: function fSubtitle() {
    var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return (0, _lodash.merge)({
      text: '',
      floating: true,
      align: 'left',
      x: 25,
      y: 45,
      style: {
        color: 'black',
        fontSize: '16px',
        fontWeight: 'normal'
      }
    }, option);
  },
  fXAxisOpposite: function fXAxisOpposite() {
    var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    return (0, _lodash.merge)({
      opposite: true,
      tickLength: 0,
      tickPosition: 'inside',
      labels: {
        y: -5
      }
    }, option);
  }
};

exports.default = Chart;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\constants\Chart.js.map