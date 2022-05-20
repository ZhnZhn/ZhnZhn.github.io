"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.crMarkerSplitRatio = exports.crMarkerExDividend = void 0;

var _Color = _interopRequireDefault(require("../constants/Color"));

const _crMarker = (color, formatterPointPropName) => ({
  y: 0,
  exValue: 0.5,
  marker: {
    symbol: 'circle',
    fillColor: color,
    lineColor: color,
    radius: 6,
    states: {
      hover: {
        enable: true,
        fillColor: _Color.default.PLOT,
        lineColor: color,
        lineWidth: 2,
        radius: 6
      }
    }
  },
  dataLabels: {
    enabled: true,
    inside: true,
    color: color,
    style: {
      fill: color,
      stroke: color,
      color: color,
      fontSize: '12px',
      fontWeight: 'normal',
      textShadow: 'none',
      textOutline: '0px transparent'
    },
    crop: false,
    overflow: 'none',
    y: 32,
    formatter: function () {
      return this.point[formatterPointPropName];
    }
  }
});

const crMarkerExDividend = () => _crMarker(_Color.default.EX_DIVIDEND, 'exValue');

exports.crMarkerExDividend = crMarkerExDividend;

const crMarkerSplitRatio = () => _crMarker(_Color.default.SPLIT_RATIO, 'splitRatio');

exports.crMarkerSplitRatio = crMarkerSplitRatio;
//# sourceMappingURL=MarkerFn.js.map