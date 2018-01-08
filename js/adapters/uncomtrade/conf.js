'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var C = {
  MAX_SHOW: 6,

  WORLD: 'World',
  ALL: 'all',

  DESCR_EMPTY: 'Dataset is empty.',

  MM_DD: '-12-31',
  AVG_PRICE: 'avgPrice',
  WORLD_COLOR: '#7cb5ec',

  CHART: {
    spacingTop: 24,
    marginTop: 42,
    marginBottom: 38
  },
  SPLINE: {
    type: 'spline'
  },
  SPLINE_NOT_VISIBLE: {
    type: 'spline', visible: false
  },
  X_AXIS: {
    type: 'category',
    opposite: false,
    labels: {
      y: 18
    },
    crosshair: null,
    tickColor: 'gray',
    tickWidth: 3,
    tickLength: 7,
    tickPosition: 'outside',
    //tickPosition: 'inside',
    gridLineWidth: 0
  },
  Y_AXIS: {
    lineWidth: 0,
    tickLength: 0,
    startOnTick: true,
    endOnTick: true,
    minPadding: 0.05,
    maxPadding: 0.05,
    plotLines: null,
    labels: {
      x: 3
    }
  }

};

exports.default = C;
//# sourceMappingURL=conf.js.map