"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Color = _interopRequireDefault(require("../styles/Color"));

var _Sparklines = require("../zhn-sparklines/Sparklines");

var C_YELLOW = _Color["default"].YELLOW;
var S = {
  REF_LINE: {
    stroke: 'red',
    strokeOpacity: .75,
    strokeDasharray: '5, 3'
  },
  BARS: {
    stroke: "black",
    strokeWidth: "1",
    fill: C_YELLOW,
    fillOpacity: "0.9"
  }
};
var SparkFactory = {
  createSparklines: function createSparklines(data, pointIndex) {
    return /*#__PURE__*/_react["default"].createElement(_Sparklines.Sparklines, {
      height: 45,
      width: 100,
      svgHeight: 45,
      svgWidth: 100,
      data: data
    }, /*#__PURE__*/_react["default"].createElement(_Sparklines.SparklinesLine, {
      color: C_YELLOW
    }), /*#__PURE__*/_react["default"].createElement(_Sparklines.SparklinesReferenceLine, {
      style: S.REF_LINE,
      type: "avg"
    }), /*#__PURE__*/_react["default"].createElement(_Sparklines.SparklinesSpots, null), /*#__PURE__*/_react["default"].createElement(_Sparklines.SparklinesSpot, {
      pointIndex: pointIndex
    }));
  },
  createSparkbars: function createSparkbars(data, pointIndex) {
    return /*#__PURE__*/_react["default"].createElement(_Sparklines.Sparklines, {
      height: 45,
      width: 100,
      svgHeight: 45,
      svgWidth: 100,
      data: data,
      min: 0,
      max: 100
    }, /*#__PURE__*/_react["default"].createElement(_Sparklines.SparklinesBars, {
      style: S.BARS,
      pointIndex: pointIndex
    }));
  }
};
var _default = SparkFactory;
exports["default"] = _default;
//# sourceMappingURL=SparkFactory.js.map