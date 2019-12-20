"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _Color = _interopRequireDefault(require("../constants/Color"));

var _crMarker = function _crMarker(color, dataLabelsY) {
  if (color === void 0) {
    color = _Color["default"].EX_DIVIDEND;
  }

  if (dataLabelsY === void 0) {
    dataLabelsY = 32;
  }

  return {
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
          fillColor: _Color["default"].PLOT,
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
      y: dataLabelsY,
      formatter: function formatter() {
        return this.point.exValue;
      }
    }
  };
};

var WithMarkers = {
  crMarkerExDividend: _crMarker,
  crMarkerSplitRatio: function crMarkerSplitRatio() {
    var point = _crMarker(_Color["default"].SPLIT_RATIO);

    point.dataLabels.formatter = function () {
      return this.point.splitRatio;
    };

    return point;
  }
};
var _default = WithMarkers;
exports["default"] = _default;
//# sourceMappingURL=WithMarkers.js.map