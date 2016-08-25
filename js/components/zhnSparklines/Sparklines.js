'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SparklinesReferenceLine = exports.SparklinesBars = exports.SparklinesSpot = exports.SparklinesSpots = exports.SparklinesLine = exports.Sparklines = undefined;

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

var Sparklines = _react2.default.createClass({
    displayName: 'Sparklines',

    propTypes: {
        data: _react2.default.PropTypes.array,
        limit: _react2.default.PropTypes.number,
        width: _react2.default.PropTypes.number,
        height: _react2.default.PropTypes.number,
        svgWidth: _react2.default.PropTypes.number,
        svgHeight: _react2.default.PropTypes.number,
        preserveAspectRatio: _react2.default.PropTypes.string,
        margin: _react2.default.PropTypes.number,
        style: _react2.default.PropTypes.object,
        min: _react2.default.PropTypes.number,
        max: _react2.default.PropTypes.number
    },

    shouldComponentUpdate: function shouldComponentUpdate(nextProps) {
        return (0, _reactAddonsShallowCompare2.default)(this, nextProps);
    },
    render: function render() {
        var _props = this.props;
        var _props$data = _props.data;
        var data = _props$data === undefined ? DEFAULT_DATA : _props$data;
        var limit = _props.limit;
        var _props$width = _props.width;
        var width = _props$width === undefined ? DEFAULT_WIDTH : _props$width;
        var _props$height = _props.height;
        var height = _props$height === undefined ? DEFAULT_HEIGHT : _props$height;
        var svgWidth = _props.svgWidth;
        var svgHeight = _props.svgHeight;
        var _props$preserveAspect = _props.preserveAspectRatio;
        var preserveAspectRatio = _props$preserveAspect === undefined ? DEFAULT_RATIO : _props$preserveAspect;
        var _props$margin = _props.margin;
        var margin = _props$margin === undefined ? DEFAULT_MARGIN : _props$margin;
        var style = _props.style;
        var max = _props.max;
        var min = _props.min;


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
});

exports.Sparklines = Sparklines;
exports.SparklinesLine = _SparklinesLine2.default;
exports.SparklinesSpots = _SparklinesSpots2.default;
exports.SparklinesSpot = _SparklinesSpot2.default;
exports.SparklinesBars = _SparklinesBars2.default;
exports.SparklinesReferenceLine = _SparklinesReferenceLine2.default;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhnSparklines\Sparklines.js.map