"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.crSparkLines = exports.crSparkBars = void 0;

var _Color = _interopRequireDefault(require("../styles/Color"));

var _SparklinesLazy = _interopRequireDefault(require("../zhn-lazy/SparklinesLazy"));

var _jsxRuntime = require("react/jsx-runtime");

const {
  SparkView,
  Line,
  Spots,
  Spot,
  ReferenceLine,
  Bars
} = _SparklinesLazy.default;
const C_YELLOW = _Color.default.YELLOW;
const S_REF_LINE = {
  stroke: 'red',
  strokeOpacity: .75,
  strokeDasharray: '5, 3'
},
      S_BARS = {
  stroke: "black",
  strokeWidth: "1",
  fill: C_YELLOW,
  fillOpacity: "0.9"
};

const crSparkLines = (data, pointIndex) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(SparkView, {
  height: 45,
  width: 100,
  svgHeight: 45,
  svgWidth: 100,
  data: data,
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(Line, {
    color: C_YELLOW
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(ReferenceLine, {
    style: S_REF_LINE,
    type: "avg"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Spots, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(Spot, {
    pointIndex: pointIndex
  })]
});

exports.crSparkLines = crSparkLines;

const crSparkBars = (data, pointIndex) => /*#__PURE__*/(0, _jsxRuntime.jsx)(SparkView, {
  height: 45,
  width: 100,
  svgHeight: 45,
  svgWidth: 100,
  data: data,
  min: 0,
  max: 100,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(Bars, {
    style: S_BARS,
    pointIndex: pointIndex
  })
});

exports.crSparkBars = crSparkBars;
//# sourceMappingURL=SparkFactory.js.map