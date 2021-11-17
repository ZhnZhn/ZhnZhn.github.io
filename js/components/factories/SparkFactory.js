"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Color = _interopRequireDefault(require("../styles/Color"));

var _Sparklines = _interopRequireDefault(require("../zhn-sparklines/Sparklines"));

var _jsxRuntime = require("react/jsx-runtime");

const {
  SparkView,
  Line,
  Spots,
  Spot,
  ReferenceLine,
  Bars
} = _Sparklines.default;
const C_YELLOW = _Color.default.YELLOW;
const S = {
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
const SparkFactory = {
  createSparklines(data, pointIndex) {
    return /*#__PURE__*/(0, _jsxRuntime.jsxs)(SparkView, {
      height: 45,
      width: 100,
      svgHeight: 45,
      svgWidth: 100,
      data: data,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Line, {
        color: C_YELLOW
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(ReferenceLine, {
        style: S.REF_LINE,
        type: "avg"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Spots, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(Spot, {
        pointIndex: pointIndex
      })]
    });
  },

  createSparkbars(data, pointIndex) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(SparkView, {
      height: 45,
      width: 100,
      svgHeight: 45,
      svgWidth: 100,
      data: data,
      min: 0,
      max: 100,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Bars, {
        style: S.BARS,
        pointIndex: pointIndex
      })
    });
  }

};
var _default = SparkFactory;
exports.default = _default;
//# sourceMappingURL=SparkFactory.js.map