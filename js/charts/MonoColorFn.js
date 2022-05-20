"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.getMonoColor = exports.crMonoColor = exports.COLOR_PERIOD = exports.COLOR_BASE2 = exports.COLOR_BASE1 = void 0;

var _highcharts = _interopRequireDefault(require("highcharts"));

var _Color = _interopRequireDefault(require("../constants/Color"));

const {
  MONO_BASE1,
  MONO_BASE2
} = _Color.default;

const _crColor = (color, brighten, opacity) => _highcharts.default.Color(color).brighten(brighten).setOpacity(opacity).get();

const _addMonoColorsTo = (colors, base) => {
  let i;

  for (i = 0; i < 4; i++) {
    // Start out with a darkened base color (negative brighten), and end
    // up with a much brighter color
    colors.push(_crColor(base, (i - 3) / 7, 0.75));
  }
};

const _crMonoColors = function (_temp) {
  let {
    base1 = MONO_BASE1,
    base2 = MONO_BASE2
  } = _temp === void 0 ? {} : _temp;
  const colors = [];

  _addMonoColorsTo(colors, base1);

  _addMonoColorsTo(colors, base2);

  return colors;
};

let _monoColors;

const _COLOR_LOW_LEVEL = -3 / 7;

const COLOR_PERIOD = 4 / 7;
exports.COLOR_PERIOD = COLOR_PERIOD;
const COLOR_BASE1 = MONO_BASE1;
exports.COLOR_BASE1 = COLOR_BASE1;
const COLOR_BASE2 = MONO_BASE2;
exports.COLOR_BASE2 = COLOR_BASE2;

const crMonoColor = function (base, deltaColor, opacity) {
  if (base === void 0) {
    base = MONO_BASE1;
  }

  if (deltaColor === void 0) {
    deltaColor = 0;
  }

  if (opacity === void 0) {
    opacity = 0.75;
  }

  return _crColor(base, _COLOR_LOW_LEVEL + deltaColor, opacity);
};

exports.crMonoColor = crMonoColor;

const getMonoColor = index => {
  const colorIndex = index % 8,
        _colors = _monoColors || (_monoColors = _crMonoColors());

  return _colors[colorIndex];
};

exports.getMonoColor = getMonoColor;
//# sourceMappingURL=MonoColorFn.js.map