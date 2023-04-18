"use strict";

exports.__esModule = true;
exports.Y_AXIS = exports.X_AXIS = exports.WORLD_COLOR = exports.WORLD_CODE = exports.WORLD = exports.S_CHART = exports.SPLINE_NOT_VISIBLE = exports.SPLINE = exports.QUANTITY = exports.NET_WEIGHT = exports.MAX_SHOW = exports.DESCR_EMPTY = exports.AVG_PER_W = exports.AVG_PER_Q = exports.ALL = void 0;
const MAX_SHOW = 6;
exports.MAX_SHOW = MAX_SHOW;
const WORLD_CODE = '0';
exports.WORLD_CODE = WORLD_CODE;
const WORLD = 'World';
exports.WORLD = WORLD;
const ALL = 'all';
exports.ALL = ALL;
const NET_WEIGHT = 'netWgt';
exports.NET_WEIGHT = NET_WEIGHT;
const QUANTITY = 'qty';
exports.QUANTITY = QUANTITY;
const AVG_PER_W = 'avgPerWeight';
exports.AVG_PER_W = AVG_PER_W;
const AVG_PER_Q = 'avgPerQuantity';
exports.AVG_PER_Q = AVG_PER_Q;
const DESCR_EMPTY = '';
exports.DESCR_EMPTY = DESCR_EMPTY;
const WORLD_COLOR = '#7cb5ec';
exports.WORLD_COLOR = WORLD_COLOR;
const S_CHART = {
  spacingTop: 24,
  marginTop: 42,
  marginBottom: 38
};
exports.S_CHART = S_CHART;
const SPLINE = {
  type: 'spline'
};
exports.SPLINE = SPLINE;
const SPLINE_NOT_VISIBLE = {
  type: 'spline',
  visible: false
};
exports.SPLINE_NOT_VISIBLE = SPLINE_NOT_VISIBLE;
const X_AXIS = {
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
};
exports.X_AXIS = X_AXIS;
const Y_AXIS = {
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
};
exports.Y_AXIS = Y_AXIS;
//# sourceMappingURL=conf.js.map