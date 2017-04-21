'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SparklinesReferenceLine = exports.SparklinesBars = exports.SparklinesSpot = exports.SparklinesSpots = exports.SparklinesLine = exports.Sparklines = undefined;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SparklinesLine = require('./SparklinesLine');

var _SparklinesLine2 = _interopRequireDefault(_SparklinesLine);

var _SparklinesSpots = require('./SparklinesSpots');

var _SparklinesSpots2 = _interopRequireDefault(_SparklinesSpots);

var _SparklinesSpot = require('./SparklinesSpot');

var _SparklinesSpot2 = _interopRequireDefault(_SparklinesSpot);

var _SparklinesBars = require('./SparklinesBars');

var _SparklinesBars2 = _interopRequireDefault(_SparklinesBars);

var _SparklinesReferenceLine = require('./SparklinesReferenceLine');

var _SparklinesReferenceLine2 = _interopRequireDefault(_SparklinesReferenceLine);

var _dataToPoints = require('./dataProcessing/dataToPoints');

var _dataToPoints2 = _interopRequireDefault(_dataToPoints);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_DATA = [],
    DEFAULT_WIDTH = 240,
    DEFAULT_HEIGHT = 60,
    DEFAULT_RATIO = 'none',
    DEFAULT_MARGIN = 2;

var Sparklines = function (_Component) {
    (0, _inherits3.default)(Sparklines, _Component);

    function Sparklines() {
        (0, _classCallCheck3.default)(this, Sparklines);
        return (0, _possibleConstructorReturn3.default)(this, (Sparklines.__proto__ || Object.getPrototypeOf(Sparklines)).apply(this, arguments));
    }

    (0, _createClass3.default)(Sparklines, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            return (0, _reactAddonsShallowCompare2.default)(this, nextProps);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                _props$data = _props.data,
                data = _props$data === undefined ? DEFAULT_DATA : _props$data,
                limit = _props.limit,
                _props$width = _props.width,
                width = _props$width === undefined ? DEFAULT_WIDTH : _props$width,
                _props$height = _props.height,
                height = _props$height === undefined ? DEFAULT_HEIGHT : _props$height,
                svgWidth = _props.svgWidth,
                svgHeight = _props.svgHeight,
                _props$preserveAspect = _props.preserveAspectRatio,
                preserveAspectRatio = _props$preserveAspect === undefined ? DEFAULT_RATIO : _props$preserveAspect,
                _props$margin = _props.margin,
                margin = _props$margin === undefined ? DEFAULT_MARGIN : _props$margin,
                style = _props.style,
                max = _props.max,
                min = _props.min;


            if (data.length === 0) return null;

            var points = (0, _dataToPoints2.default)({ data: data, limit: limit, width: width, height: height, margin: margin, max: max, min: min }),
                svgOpts = { style: style, viewBox: '0 0 ' + width + ' ' + height, preserveAspectRatio: preserveAspectRatio };

            if (svgWidth > 0) svgOpts.width = svgWidth;
            if (svgHeight > 0) svgOpts.height = svgHeight;

            return _react2.default.createElement(
                'svg',
                svgOpts,
                _react2.default.Children.map(this.props.children, function (child) {
                    return _react2.default.cloneElement(child, { points: points, width: width, height: height, margin: margin });
                })
            );
        }
    }]);
    return Sparklines;
}(_react.Component);

process.env.NODE_ENV !== "production" ? Sparklines.propTypes = {
    data: _react.PropTypes.array,
    limit: _react.PropTypes.number,
    width: _react.PropTypes.number,
    height: _react.PropTypes.number,
    svgWidth: _react.PropTypes.number,
    svgHeight: _react.PropTypes.number,
    preserveAspectRatio: _react.PropTypes.string,
    margin: _react.PropTypes.number,
    style: _react.PropTypes.object,
    min: _react.PropTypes.number,
    max: _react.PropTypes.number
} : void 0;
exports.Sparklines = Sparklines;
exports.SparklinesLine = _SparklinesLine2.default;
exports.SparklinesSpots = _SparklinesSpots2.default;
exports.SparklinesSpot = _SparklinesSpot2.default;
exports.SparklinesBars = _SparklinesBars2.default;
exports.SparklinesReferenceLine = _SparklinesReferenceLine2.default;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhnSparklines\Sparklines.js.map