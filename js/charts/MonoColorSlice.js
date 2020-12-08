"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _highcharts = _interopRequireDefault(require("highcharts"));

var _Color = _interopRequireDefault(require("../constants/Color"));

var MONO_BASE1 = _Color["default"].MONO_BASE1,
    MONO_BASE2 = _Color["default"].MONO_BASE2;

var _crColor = function _crColor(color, brighten, opacity) {
  return _highcharts["default"].Color(color).brighten(brighten).setOpacity(opacity).get();
};

var _addMonoColorsTo = function _addMonoColorsTo(colors, base) {
  var i;

  for (i = 0; i < 4; i++) {
    // Start out with a darkened base color (negative brighten), and end
    // up with a much brighter color
    colors.push(_crColor(base, (i - 3) / 7, 0.75));
  }
};

var _crMonoColors = function _crMonoColors(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$base = _ref.base1,
      base1 = _ref$base === void 0 ? MONO_BASE1 : _ref$base,
      _ref$base2 = _ref.base2,
      base2 = _ref$base2 === void 0 ? MONO_BASE2 : _ref$base2;

  var colors = [];

  _addMonoColorsTo(colors, base1);

  _addMonoColorsTo(colors, base2);

  return colors;
};

var _monoColors;

var _COLOR_LOW_LEVEL = -3 / 7;

var MonoColorSlice = {
  COLOR_PERIOD: 4 / 7,
  COLOR_BASE1: MONO_BASE1,
  COLOR_BASE2: MONO_BASE2,
  crMonoColor: function crMonoColor(base, deltaColor, opacity) {
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
  },
  getMonoColor: function getMonoColor(index) {
    var colorIndex = index % 8,
        _colors = _monoColors || (_monoColors = _crMonoColors());

    return _colors[colorIndex];
  }
};
var _default = MonoColorSlice;
exports["default"] = _default;
//# sourceMappingURL=MonoColorSlice.js.map