'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _merge = require('lodash/merge');

var _merge2 = _interopRequireDefault(_merge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

  fDefault: function fDefault() {
    return this.DEFAULT;
  },
  fBlackAxis: function fBlackAxis() {
    return (0, _merge2.default)({}, this.BLACK_AXIS);
  },
  fBlackAxisTitle: function fBlackAxisTitle() {
    return (0, _merge2.default)({}, this.BLACK_AXIS, this.BLACK_TITLE);
  },
  fBlackAll: function fBlackAll() {
    return (0, _merge2.default)({}, this.BLACK_AXIS, this.BLACK_TITLE, this.BLACK_SERIES);
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
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\charts\ChartExportConfig.js.map