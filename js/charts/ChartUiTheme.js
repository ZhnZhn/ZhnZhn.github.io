"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.setChartTheme = exports.setAxisLabelsColor = void 0;
var _highcharts = _interopRequireDefault(require("highcharts"));
var _Color = require("../constants/Color");
const _crAreaPlotOptions = (topColor, bottomColor) => ({
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
});
const setChartTheme = isLighTheme => {
  const bottomColor = isLighTheme ? _Color.COLOR_PLOT_G3 : _Color.COLOR_PLOT_G2;
  _highcharts.default.setOptions(_crAreaPlotOptions(_Color.COLOR_PLOT_G1, bottomColor));
};
exports.setChartTheme = setChartTheme;
const _crLabelsStyleColor = color => ({
    labels: {
      style: {
        color
      }
    }
  }),
  DF_AXIS_LABEL_COLOR = 'grey';
const setAxisLabelsColor = function (xAxisColor, yAxisColor) {
  if (xAxisColor === void 0) {
    xAxisColor = DF_AXIS_LABEL_COLOR;
  }
  if (yAxisColor === void 0) {
    yAxisColor = DF_AXIS_LABEL_COLOR;
  }
  _highcharts.default.setOptions({
    xAxis: _crLabelsStyleColor(xAxisColor),
    yAxis: _crLabelsStyleColor(yAxisColor)
  });
};
exports.setAxisLabelsColor = setAxisLabelsColor;
//# sourceMappingURL=ChartUiTheme.js.map