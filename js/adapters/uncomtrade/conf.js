"use strict";

exports.__esModule = true;
exports.Y_AXIS = exports.X_AXIS = exports.WORLD_ITEM_NAME = exports.WORLD_COLOR = exports.WORLD_CODE = exports.WORLD = exports.S_CHART = exports.SPLINE_NOT_VISIBLE = exports.SPLINE = exports.QUANTITY = exports.NET_WEIGHT = exports.MAX_SHOW = exports.DESCR_EMPTY = exports.AVG_PER_W = exports.AVG_PER_Q = exports.ALL = void 0;
const MAX_SHOW = exports.MAX_SHOW = 6;
const WORLD = exports.WORLD = 'World';
const WORLD_CODE = exports.WORLD_CODE = '0';
const WORLD_ITEM_NAME = exports.WORLD_ITEM_NAME = `${WORLD} (${WORLD_CODE})`;
const ALL = exports.ALL = 'all';
const NET_WEIGHT = exports.NET_WEIGHT = 'netWgt';
const QUANTITY = exports.QUANTITY = 'qty';
const AVG_PER_W = exports.AVG_PER_W = 'avgPerWeight';
const AVG_PER_Q = exports.AVG_PER_Q = 'avgPerQuantity';
const DESCR_EMPTY = exports.DESCR_EMPTY = '';
const WORLD_COLOR = exports.WORLD_COLOR = '#7cb5ec';
const S_CHART = exports.S_CHART = {
  marginTop: 42,
  marginBottom: 38
};
const SPLINE = exports.SPLINE = {
  type: 'spline'
};
const SPLINE_NOT_VISIBLE = exports.SPLINE_NOT_VISIBLE = {
  type: 'spline',
  visible: false
};
const X_AXIS = exports.X_AXIS = {
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
const Y_AXIS = exports.Y_AXIS = {
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
//# sourceMappingURL=conf.js.map