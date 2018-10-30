'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _highcharts = require('highcharts');

var _highcharts2 = _interopRequireDefault(_highcharts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var merge = _highcharts2.default.merge;

var ChartExportConfig = {

  DEFAULT: {
    chart: {
      plotBackgroundColor: 'white',
      backgroundColor: 'white'
    },
    plotOptions: {
      area: {
        fillColor: 'white'
      },
      arearange: {
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
      arearange: {
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

  fDefault: function fDefault() {
    return this.DEFAULT;
  },
  fBlackAxis: function fBlackAxis() {
    return merge(false, {}, this.BLACK_AXIS);
  },
  fBlackAxisTitle: function fBlackAxisTitle() {
    return merge(false, {}, this.BLACK_AXIS, this.BLACK_TITLE);
  },
  fBlackAll: function fBlackAll() {
    return merge(false, {}, this.BLACK_AXIS, this.BLACK_TITLE, this.BLACK_SERIES);
  },
  createOptionStyles: function createOptionStyles() {
    return [{ caption: 'Default', value: {} }, {
      caption: 'Default + Black Axis',
      value: this.fBlackAxis() }, {
      caption: 'Default + Black Axis + Black Title',
      value: this.fBlackAxisTitle()
    }, { caption: 'All Black', value: this.fBlackAll() }];
  }
};

exports.default = ChartExportConfig;
//# sourceMappingURL=ChartExportConfig.js.map