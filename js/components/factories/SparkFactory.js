"use strict";

exports.__esModule = true;
exports.crSparkLines = exports.crSparkBars = void 0;
var _Color = require("../styles/Color");
var _SparklinesLazy = require("../zhn-lazy/SparklinesLazy");
var _jsxRuntime = require("react/jsx-runtime");
//import SparklinesLazy from '../zhn-lazy/SparklinesLazy';

/*
const {
  SparkView,
  Line,
  Spots,
  Spot,
  ReferenceLine,
  Bars
} = SparklinesLazy;
*/const S_REF_LINE = {
    stroke: 'red',
    strokeOpacity: .75,
    strokeDasharray: '5, 3'
  },
  S_BARS = {
    stroke: "black",
    strokeWidth: "1",
    fill: _Color.YELLOW_COLOR,
    fillOpacity: "0.9"
  };
const crSparkLines = (data, pointIndex) => /*#__PURE__*/(0, _jsxRuntime.jsxs)(_SparklinesLazy.SparkView, {
  height: 45,
  width: 100,
  svgHeight: 45,
  svgWidth: 100,
  data: data,
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_SparklinesLazy.Line, {
    color: _Color.YELLOW_COLOR
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SparklinesLazy.ReferenceLine, {
    style: S_REF_LINE,
    type: "avg"
  }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SparklinesLazy.Spots, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_SparklinesLazy.Spot, {
    pointIndex: pointIndex
  })]
});
exports.crSparkLines = crSparkLines;
const crSparkBars = (data, pointIndex) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_SparklinesLazy.SparkView, {
  height: 45,
  width: 100,
  svgHeight: 45,
  svgWidth: 100,
  data: data,
  min: 0,
  max: 100,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_SparklinesLazy.Bars, {
    style: S_BARS,
    pointIndex: pointIndex
  })
});
exports.crSparkBars = crSparkBars;
//# sourceMappingURL=SparkFactory.js.map