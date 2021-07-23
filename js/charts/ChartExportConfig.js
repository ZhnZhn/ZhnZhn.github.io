"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _highcharts = _interopRequireDefault(require("highcharts"));

const merge = _highcharts.default.merge;
const ChartExportConfig = {
  DEFAULT: {
    chart: {
      plotBackgroundColor: 'white',
      backgroundColor: 'white'
    },
    plotOptions: {
      area: {
        fillColor: 'white'
      }
    },
    xAxis: {
      lineWidth: 2,
      lineColor: 'black',
      gridLineColor: 'gray'
    },
    yAxis: {
      lineWidth: 2,
      lineColor: 'black',
      gridLineColor: 'gray'
    }
  },
  BLACK_AXIS: {
    xAxis: {
      labels: {
        style: {
          color: 'black'
        }
      }
    },
    yAxis: {
      tickColor: 'black',
      labels: {
        style: {
          color: 'black'
        }
      }
    }
  },
  BLACK_TITLE: {
    title: {
      style: {
        color: 'black'
      }
    }
  },
  BLACK_SERIES: {
    plotOptions: {
      area: {
        color: 'black'
      },
      spline: {
        color: 'black'
      },
      line: {
        color: 'black'
      }
    }
  },
  merge: merge,

  fDefault() {
    return this.DEFAULT;
  },

  fBlackAxis() {
    return merge(false, {}, this.BLACK_AXIS);
  },

  fBlackAxisTitle() {
    return merge(false, {}, this.BLACK_AXIS, this.BLACK_TITLE);
  },

  fBlackAll() {
    return merge(false, {}, this.BLACK_AXIS, this.BLACK_TITLE, this.BLACK_SERIES);
  },

  createOptionStyles() {
    return [{
      caption: 'Default',
      value: {}
    }, {
      caption: 'Default + Black Axis',
      value: this.fBlackAxis()
    }, {
      caption: 'Default + Black Axis + Black Title',
      value: this.fBlackAxisTitle()
    }, {
      caption: 'All Black',
      value: this.fBlackAll()
    }];
  }

};
var _default = ChartExportConfig;
exports.default = _default;
//# sourceMappingURL=ChartExportConfig.js.map