"use strict";

exports.__esModule = true;
exports.crMarkerExDividend = void 0;
var _Color = require("../constants/Color");
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
        fillColor: _Color.COLOR_PLOT,
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
const crMarkerExDividend = () => _crMarker(_Color.COLOR_EX_DIVIDEND, 'exValue');
exports.crMarkerExDividend = crMarkerExDividend;
//# sourceMappingURL=MarkerFn.js.map