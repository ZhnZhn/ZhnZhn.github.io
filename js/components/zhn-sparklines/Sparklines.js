"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.Sparklines = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

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
var DEFAULT_DATA = [],
    DEFAULT_WIDTH = 240,
    DEFAULT_HEIGHT = 60,
    DEFAULT_RATIO = 'none',
    DEFAULT_MARGIN = 2;

var Sparklines = /*#__PURE__*/function (_PureComponent) {
  (0, _inheritsLoose2["default"])(Sparklines, _PureComponent);

  function Sparklines() {
    return _PureComponent.apply(this, arguments) || this;
  }

  var _proto = Sparklines.prototype;

  /*
    static propTypes = {
       data: PropTypes.array,
       limit: PropTypes.number,
       width: PropTypes.number,
       height: PropTypes.number,
       svgWidth: PropTypes.number,
       svgHeight: PropTypes.number,
       preserveAspectRatio: PropTypes.string,
       margin: PropTypes.number,
       style: PropTypes.object,
       min: PropTypes.number,
       max: PropTypes.number
    }
  */
  _proto.render = function render() {
    var _this$props = this.props,
        _this$props$data = _this$props.data,
        data = _this$props$data === void 0 ? DEFAULT_DATA : _this$props$data,
        limit = _this$props.limit,
        _this$props$width = _this$props.width,
        width = _this$props$width === void 0 ? DEFAULT_WIDTH : _this$props$width,
        _this$props$height = _this$props.height,
        height = _this$props$height === void 0 ? DEFAULT_HEIGHT : _this$props$height,
        svgWidth = _this$props.svgWidth,
        svgHeight = _this$props.svgHeight,
        _this$props$preserveA = _this$props.preserveAspectRatio,
        preserveAspectRatio = _this$props$preserveA === void 0 ? DEFAULT_RATIO : _this$props$preserveA,
        _this$props$margin = _this$props.margin,
        margin = _this$props$margin === void 0 ? DEFAULT_MARGIN : _this$props$margin,
        style = _this$props.style,
        max = _this$props.max,
        min = _this$props.min;
    if (data.length === 0) return null;
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
      viewBox: "0 0 " + width + " " + height,
      preserveAspectRatio: preserveAspectRatio
    };
    if (svgWidth > 0) svgOpts.width = svgWidth;
    if (svgHeight > 0) svgOpts.height = svgHeight;
    return /*#__PURE__*/_react["default"].createElement("svg", svgOpts, _react["default"].Children.map(this.props.children, function (child) {
      return /*#__PURE__*/_react["default"].cloneElement(child, {
        data: data,
        points: points,
        width: width,
        height: height,
        margin: margin
      });
    }));
  };

  return Sparklines;
}(_react.PureComponent);

exports.Sparklines = Sparklines;
//# sourceMappingURL=Sparklines.js.map