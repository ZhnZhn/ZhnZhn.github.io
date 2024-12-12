"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _Line = _interopRequireDefault(require("./Line"));
var _Bars = _interopRequireDefault(require("./Bars"));
var _Spots = _interopRequireDefault(require("./Spots"));
var _Spot = _interopRequireDefault(require("./Spot"));
var _ReferenceLine = _interopRequireDefault(require("./ReferenceLine"));
var _MinLabel = _interopRequireDefault(require("./MinLabel"));
var _MaxLabel = _interopRequireDefault(require("./MaxLabel"));
var _dataToPoints = _interopRequireDefault(require("./dataProcessing/dataToPoints"));
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from 'prop-types';

const DF_WIDTH = 240,
  DF_HEIGHT = 60,
  DF_RATIO = 'none',
  DF_MARGIN = 2;
const SparkView = (0, _uiApi.memo)(_ref => {
  let {
    data,
    limit,
    style,
    preserveAspectRatio = DF_RATIO,
    width = DF_WIDTH,
    height = DF_HEIGHT,
    svgWidth,
    svgHeight,
    margin = DF_MARGIN,
    min,
    max,
    children
  } = _ref;
  if (!(0, _uiApi.isArr)(data) || data.length === 0) {
    return null;
  }
  const points = (0, _dataToPoints.default)({
      data,
      limit,
      width,
      height,
      margin,
      max,
      min
    }),
    svgOpts = {
      style,
      preserveAspectRatio,
      viewBox: `0 0 ${width} ${height}`,
      width: svgWidth > 0 ? svgWidth : void 0,
      height: svgHeight > 0 ? svgHeight : void 0
    };
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("svg", {
    ...svgOpts,
    children: (0, _uiApi.safeMapElements)(children, (childElement, index) => (0, _uiApi.cloneUiElement)(childElement, {
      data,
      points,
      width,
      height,
      margin
    }, childElement.key || index))
  });
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
var _default = exports.default = {
  SparkView,
  Line: _Line.default,
  Bars: _Bars.default,
  Spots: _Spots.default,
  Spot: _Spot.default,
  ReferenceLine: _ReferenceLine.default,
  MinLabel: _MinLabel.default,
  MaxLabel: _MaxLabel.default
};
//# sourceMappingURL=Sparklines.js.map