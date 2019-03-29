'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var MAX_ID = 'max';
var MIN_ID = 'min';

var _findPlotLine = function _findPlotLine(chart, id) {
  return chart.options.yAxis[0].plotLines.find(function (item) {
    return item.id === id;
  });
};

var zhToggleMinMaxLines = function zhToggleMinMaxLines(Chart) {
  Chart.prototype.zhToggleMinMaxLines = function () {
    try {
      var _maxLine = _findPlotLine(this, MAX_ID);
      if (_maxLine) {
        this.zhMaxLine = _maxLine;
        this.zhMinLine = _findPlotLine(this, MIN_ID);
        this.yAxis[0].removePlotLine(MAX_ID);
        this.yAxis[0].removePlotLine(MIN_ID);
      } else {
        this.yAxis[0].addPlotLine(this.zhMaxLine);
        this.yAxis[0].addPlotLine(this.zhMinLine);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
};

exports.default = zhToggleMinMaxLines;
//# sourceMappingURL=zhToggleMinMaxLines.js.map