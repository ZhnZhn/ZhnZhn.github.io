"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _highcharts = _interopRequireDefault(require("highcharts"));

var _Color = _interopRequireDefault(require("../constants/Color"));

var _addMonoColorsTo = function _addMonoColorsTo(colors, base) {
  if (colors === void 0) {
    colors = [];
  }

  var i; // Start out with a darkened base color (negative brighten), and end
  // up with a much brighter color

  for (i = 0; i < 4; i++) {
    colors.push(_highcharts["default"].Color(base).brighten((i - 3) / 7).get());
  }
};

var C = {
  HEIGHT: 300,
  THEME_SPACING_TOP: 5,
  SPACING_BOTTOM: 20,
  MARGIN_RIGHT: 50,
  CREDITS_COLOR: '#909090',
  CREDITS_URL: 'https://highcharts.com',
  fMonoPieColors: function fMonoPieColors(_temp) {
    var _ref = _temp === void 0 ? {} : _temp,
        _ref$base = _ref.base1,
        base1 = _ref$base === void 0 ? _Color["default"].MONO_BASE1 : _ref$base,
        _ref$base2 = _ref.base2,
        base2 = _ref$base2 === void 0 ? _Color["default"].MONO_BASE2 : _ref$base2;

    var colors = [];

    _addMonoColorsTo(colors, base1);

    _addMonoColorsTo(colors, base2);

    return colors;
  }
};
var _default = C;
exports["default"] = _default;
//# sourceMappingURL=conf.js.map