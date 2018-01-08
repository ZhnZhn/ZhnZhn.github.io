'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _highcharts = require('highcharts');

var _highcharts2 = _interopRequireDefault(_highcharts);

var _Color = require('../constants/Color');

var _Color2 = _interopRequireDefault(_Color);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _addMonoColorsTo = function _addMonoColorsTo() {
  var colors = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var base = arguments[1];

  var i = void 0;
  // Start out with a darkened base color (negative brighten), and end
  // up with a much brighter color
  for (i = 0; i < 4; i++) {
    colors.push(_highcharts2.default.Color(base).brighten((i - 3) / 7).get());
  }
};

var C = {
  HEIGHT: 300,
  THEME_SPACING_TOP: 5,
  SPACING_BOTTOM: 20,
  MARGIN_RIGHT: 50,

  fMonoPieColors: function fMonoPieColors() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$base = _ref.base1,
        base1 = _ref$base === undefined ? _Color2.default.MONO_BASE1 : _ref$base,
        _ref$base2 = _ref.base2,
        base2 = _ref$base2 === undefined ? _Color2.default.MONO_BASE2 : _ref$base2;

    var colors = [];
    _addMonoColorsTo(colors, base1);
    _addMonoColorsTo(colors, base2);
    return colors;
  }
};

exports.default = C;
//# sourceMappingURL=conf.js.map