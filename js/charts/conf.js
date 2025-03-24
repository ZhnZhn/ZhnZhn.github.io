"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.fMonoPieColors = exports.THEME_SPACING_TOP = exports.SPACING_BOTTOM = exports.MARGIN_RIGHT = exports.HEIGHT = exports.CREDITS_URL = exports.CREDITS_COLOR = void 0;
var _highcharts = _interopRequireDefault(require("highcharts"));
var _Color = require("../constants/Color");
const _addMonoColorsTo = function (colors, levelColor) {
  if (colors === void 0) {
    colors = [];
  }
  let i;
  // Start out with a darkened base color (negative brighten), and end
  // up with a much brighter color
  for (i = 0; i < 4; i++) {
    colors.push(_highcharts.default.Color(levelColor).brighten((i - 3) / 7).get());
  }
};
const HEIGHT = exports.HEIGHT = 300;
const THEME_SPACING_TOP = exports.THEME_SPACING_TOP = 5;
const SPACING_BOTTOM = exports.SPACING_BOTTOM = 20;
const MARGIN_RIGHT = exports.MARGIN_RIGHT = 50;
const CREDITS_COLOR = exports.CREDITS_COLOR = '#909090';
const CREDITS_URL = exports.CREDITS_URL = 'https://highcharts.com';
const fMonoPieColors = function (colorLevel1, colorLevel2) {
  if (colorLevel1 === void 0) {
    colorLevel1 = _Color.COLOR_CATEGORY_LEVEL1;
  }
  if (colorLevel2 === void 0) {
    colorLevel2 = _Color.COLOR_CATEGORY_LEVEL2;
  }
  const colors = [];
  _addMonoColorsTo(colors, colorLevel1);
  _addMonoColorsTo(colors, colorLevel2);
  return colors;
};
exports.fMonoPieColors = fMonoPieColors;
//# sourceMappingURL=conf.js.map