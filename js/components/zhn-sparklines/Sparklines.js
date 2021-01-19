"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.Sparklines = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _SparklinesLine = _interopRequireDefault(require("./SparklinesLine"));

exports.SparklinesLine = _SparklinesLine["default"];

var _SparklinesSpots = _interopRequireDefault(require("./SparklinesSpots"));

exports.SparklinesSpots = _SparklinesSpots["default"];

var _SparklinesSpot = _interopRequireDefault(require("./SparklinesSpot"));

exports.SparklinesSpot = _SparklinesSpot["default"];

var _SparklinesBars = _interopRequireDefault(require("./SparklinesBars"));

exports.SparklinesBars = _SparklinesBars["default"];

var _SparklinesReferenceLine = _interopRequireDefault(require("./SparklinesReferenceLine"));

exports.SparklinesReferenceLine = _SparklinesReferenceLine["default"];

var _SparklinesMinLabel = _interopRequireDefault(require("./SparklinesMinLabel"));

exports.SparklinesMinLabel = _SparklinesMinLabel["default"];

var _SparklinesMaxLabel = _interopRequireDefault(require("./SparklinesMaxLabel"));

exports.SparklinesMaxLabel = _SparklinesMaxLabel["default"];

var _dataToPoints = _interopRequireDefault(require("./dataProcessing/dataToPoints"));

//import PropTypes from 'prop-types';
//fork https://github.com/borisyankov/react-sparklines
var _isArr = Array.isArray;
var DF = {
  WIDTH: 240,
  HEIGHT: 60,
  RATIO: 'none',
  MARGIN: 2
};
var Sparklines = /*#__PURE__*/(0, _react.memo)(function (_ref) {
  var data = _ref.data,
      limit = _ref.limit,
      style = _ref.style,
      _ref$preserveAspectRa = _ref.preserveAspectRatio,
      preserveAspectRatio = _ref$preserveAspectRa === void 0 ? DF.RATIO : _ref$preserveAspectRa,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? DF.WIDTH : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? DF.HEIGHT : _ref$height,
      svgWidth = _ref.svgWidth,
      svgHeight = _ref.svgHeight,
      _ref$margin = _ref.margin,
      margin = _ref$margin === void 0 ? DF.MARGIN : _ref$margin,
      min = _ref.min,
      max = _ref.max,
      children = _ref.children;

  if (!_isArr(data) || data.length === 0) {
    return null;
  }

  var points = (0, _dataToPoints["default"])({
    data: data,
    limit: limit,
    width: width,
    height: height,
    margin: margin,
    max: max,
    min: min
  }),
      svgOpts = {
    style: style,
    preserveAspectRatio: preserveAspectRatio,
    viewBox: "0 0 " + width + " " + height,
    width: svgWidth > 0 ? svgWidth : void 0,
    height: svgHeight > 0 ? svgHeight : void 0
  };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("svg", (0, _extends2["default"])({}, svgOpts, {
    children: _react.Children.map(children, function (child) {
      return /*#__PURE__*/(0, _react.cloneElement)(child, {
        data: data,
        points: points,
        width: width,
        height: height,
        margin: margin
      });
    })
  }));
});
/*
static propTypes = {
  data: PropTypes.array,
  limit: PropTypes.number,
  style: PropTypes.object,
  preserveAspectRatio: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  svgWidth: PropTypes.number,
  svgHeight: PropTypes.number,
  margin: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number
}
*/

exports.Sparklines = Sparklines;
//# sourceMappingURL=Sparklines.js.map