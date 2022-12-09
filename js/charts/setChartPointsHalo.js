"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _highcharts = _interopRequireDefault(require("highcharts"));

const _crHaloOption = function (is) {
  if (is === void 0) {
    is = false;
  }

  return {
    plotOptions: {
      series: {
        states: {
          hover: {
            enabled: is
          }
        }
      }
    }
  };
};

const setChartPointsHalo = is => _highcharts.default.setOptions(_crHaloOption(is));

var _default = setChartPointsHalo;
exports.default = _default;
//# sourceMappingURL=setChartPointsHalo.js.map