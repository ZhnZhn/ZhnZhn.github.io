"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _highcharts = _interopRequireDefault(require("highcharts"));

var _Color = _interopRequireDefault(require("../constants/Color"));

var _crAreaPlotOptions = function _crAreaPlotOptions(topColor, bottomColor) {
  return {
    plotOptions: {
      area: {
        fillColor: {
          linearGradient: {
            x1: 0,
            x2: 0,
            y1: 0,
            y2: 1
          },
          stops: [[0, topColor], [1, bottomColor]]
        }
      }
    }
  };
};

var ChartUiTheme = {
  setTheme: function setTheme(isLighTheme) {
    var bottomColor = isLighTheme ? _Color["default"].PLOT_G3 : _Color["default"].PLOT_G2;

    _highcharts["default"].setOptions(_crAreaPlotOptions(_Color["default"].PLOT_G1, bottomColor));
  }
};
var _default = ChartUiTheme;
exports["default"] = _default;
//# sourceMappingURL=ChartUiTheme.js.map