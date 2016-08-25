'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _calcDirection = require('./dataProcessing/calcDirection');

var _calcDirection2 = _interopRequireDefault(_calcDirection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SparklinesBars = function SparklinesBars(props) {
    var _props$points = props.points;
    var points = _props$points === undefined ? [] : _props$points;
    var height = props.height;
    var _props$style = props.style;
    var style = _props$style === undefined ? {} : _props$style;
    var barWidth = props.barWidth;
    var _props$pointIndex = props.pointIndex;
    var pointIndex = _props$pointIndex === undefined ? -1 : _props$pointIndex;
    var barStrokeColors = props.barStrokeColors;
    var _style$strokeWidth = style.strokeWidth;
    var strokeWidth = _style$strokeWidth === undefined ? 0 : _style$strokeWidth;
    var _width = barWidth || (points && points.length >= 2 ? Math.ceil(Math.max(0, points[1].x - points[0].x - strokeWidth)) : 0);

    return _react2.default.createElement(
        'g',
        null,
        points.map(function (p, i) {
            var x = p.x;
            var y = p.y;
            var _style = i === pointIndex ? Object.assign({}, style, { fill: barStrokeColors[(0, _calcDirection2.default)(points, pointIndex)] }) : style;
            return _react2.default.createElement('rect', {
                key: i,
                x: Math.ceil(x - strokeWidth * i),
                y: Math.ceil(y),
                width: Math.ceil(_width),
                height: Math.ceil(Math.max(0, height - y)),
                style: _style
            });
        })
    );
};

SparklinesBars.propTypes = {
    points: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object),
    height: _react2.default.PropTypes.number,
    style: _react2.default.PropTypes.object,
    barWidth: _react2.default.PropTypes.number
};
SparklinesBars.defaultProps = {
    style: { fill: 'slategray' },
    barStrokeColors: {
        '-1': 'red',
        '0': 'black',
        '1': 'green'
    }
};

exports.default = SparklinesBars;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhnSparklines\SparklinesBars.js.map