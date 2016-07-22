'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _highcharts = require('highcharts');

var _highcharts2 = _interopRequireDefault(_highcharts);

var _Chart = require('./Chart');

var _Chart2 = _interopRequireDefault(_Chart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var C = {
  DATE_PATTERN: '%d-%m-%Y',
  ATTR_LABEL: {
    zIndex: 100
  },
  CSS_LABEL: {
    color: 'yellow',
    fontSize: '15px'
  }
};

var ChartFn = {
  handlerMouserOverPoint: function handlerMouserOverPoint(event) {
    var chart = this.series.chart,
        x = this.x,
        y = this.y,
        plotX = this.plotX,
        plotY = this.plotY,
        date = _highcharts2.default.dateFormat(C.DATE_PATTERN, x),
        dX = chart.options.chart.xDeltaCrossLabel,
        dY = chart.options.chart.yDeltaCrossLabel;

    if (chart.xCrossLabel) {
      chart.xCrossLabel.attr({
        x: plotX,
        text: date
      });
      chart.yCrossLabel.attr({
        x: chart.yAxis[0].width + chart.plotLeft + dX,
        y: plotY + chart.plotTop,
        text: y
      });
    } else {
      chart.xCrossLabel = chart.renderer.text(date, plotX, chart.plotTop - dY).attr(C.ATTR_LABEL).css(C.CSS_LABEL).add();
      chart.yCrossLabel = chart.renderer.text(y, chart.yAxis[0].width + chart.plotLeft + dX, plotY + chart.plotTop).attr(C.ATTR_LABEL).css(C.CSS_LABEL).add();
    }
  },
  toggleSeria: function toggleSeria(chart, item) {
    var name = item.name;
    var color = item.color;
    var index = item.index;
    var isSecondAxes = item.isSecondAxes;
    var seria = item.seria;


    if (isSecondAxes) {
      if (!seria.visible) {
        chart.addAxis(_Chart2.default.fSecondYAxis(name, color));
        seria.yAxis = name;
        seria.visible = true;
        chart.addSeries(seria);
      } else {
        seria.visible = false;
        chart.get(name).remove();
      }
    } else {
      var _seria = chart.series[index];
      if (_seria.visible) {
        _seria.hide();
      } else {
        _seria.show();
      }
    }
  },
  zoomIndicatorCharts: function zoomIndicatorCharts(event) {
    var zhDetailCharts = this.chart.options.zhDetailCharts;
    if (event.userMin) {
      zhDetailCharts.forEach(function (chart) {
        chart.xAxis[0].setExtremes(event.userMin, event.userMax, true, true);
      });
    } else {
      zhDetailCharts.forEach(function (chart) {
        chart.xAxis[0].setExtremes(event.min, event.max, true, true);
      });
    }
  }
};

exports.default = ChartFn;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\charts\ChartFn.js.map