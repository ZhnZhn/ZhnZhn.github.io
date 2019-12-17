"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var PN_PREFIX = 'zhPlotLine';
var MAX_ID = 'max';
var MIN_ID = 'min';

var _crPropName = function _crPropName(id) {
  return PN_PREFIX + id;
};

var _findPlotLine = function _findPlotLine(chart, id) {
  return chart.options.yAxis[0].plotLines.find(function (item) {
    return item.id === id;
  });
};

var zhTogglePlotLines = function zhTogglePlotLines(Chart) {
  Chart.prototype.zhTogglePlotLine = function (id) {
    try {
      var _pn = _crPropName(id);

      if (!this[_pn]) {
        this[_pn] = _findPlotLine(this, id);
        this.yAxis[0].removePlotLine(id);
      } else {
        this.yAxis[0].addPlotLine(this[_pn]);
        this[_pn] = null;
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  Chart.prototype.zhToggleMinMaxLines = function () {
    this.zhTogglePlotLine(MAX_ID);
    this.zhTogglePlotLine(MIN_ID);
  };
};

var _default = zhTogglePlotLines;
exports["default"] = _default;
//# sourceMappingURL=zhTogglePlotLines.js.map