"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.fMonoPieColors = exports.THEME_SPACING_TOP = exports.SPACING_BOTTOM = exports.MARGIN_RIGHT = exports.HEIGHT = exports.CREDITS_URL = exports.CREDITS_COLOR = void 0;

var _highcharts = _interopRequireDefault(require("highcharts"));

var _Color = _interopRequireDefault(require("../constants/Color"));

const _addMonoColorsTo = function (colors, base) {
  if (colors === void 0) {
    colors = [];
  }

  let i; // Start out with a darkened base color (negative brighten), and end
  // up with a much brighter color

  for (i = 0; i < 4; i++) {
    colors.push(_highcharts.default.Color(base).brighten((i - 3) / 7).get());
  }
};

const HEIGHT = 300;
exports.HEIGHT = HEIGHT;
const THEME_SPACING_TOP = 5;
exports.THEME_SPACING_TOP = THEME_SPACING_TOP;
const SPACING_BOTTOM = 20;
exports.SPACING_BOTTOM = SPACING_BOTTOM;
const MARGIN_RIGHT = 50;
exports.MARGIN_RIGHT = MARGIN_RIGHT;
const CREDITS_COLOR = '#909090';
exports.CREDITS_COLOR = CREDITS_COLOR;
const CREDITS_URL = 'https://highcharts.com';
exports.CREDITS_URL = CREDITS_URL;

const fMonoPieColors = function (_temp) {
  let {
    base1 = _Color.default.MONO_BASE1,
    base2 = _Color.default.MONO_BASE2
  } = _temp === void 0 ? {} : _temp;
  const colors = [];

  _addMonoColorsTo(colors, base1);

  _addMonoColorsTo(colors, base2);

  return colors;
};

exports.fMonoPieColors = fMonoPieColors;
//# sourceMappingURL=conf.js.map