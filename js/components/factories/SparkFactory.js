"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

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
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Sparklines.Sparklines, {
      height: 45,
      width: 100,
      svgHeight: 45,
      svgWidth: 100,
      data: data,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Sparklines.SparklinesLine, {
        color: C_YELLOW
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Sparklines.SparklinesReferenceLine, {
        style: S.REF_LINE,
        type: "avg"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Sparklines.SparklinesSpots, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Sparklines.SparklinesSpot, {
        pointIndex: pointIndex
      })]
    });
  },
  createSparkbars: function createSparkbars(data, pointIndex) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Sparklines.Sparklines, {
      height: 45,
      width: 100,
      svgHeight: 45,
      svgWidth: 100,
      data: data,
      min: 0,
      max: 100,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Sparklines.SparklinesBars, {
        style: S.BARS,
        pointIndex: pointIndex
      })
    });
  }
};
var _default = SparkFactory;
exports["default"] = _default;
//# sourceMappingURL=SparkFactory.js.map