'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _calcDirection = require('./dataProcessing/calcDirection');

var _calcDirection2 = _interopRequireDefault(_calcDirection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SparklinesBars = function SparklinesBars(props) {
    var _props$points = props.points,
        points = _props$points === undefined ? [] : _props$points,
        height = props.height,
        _props$style = props.style,
        style = _props$style === undefined ? {} : _props$style,
        barWidth = props.barWidth,
        _props$pointIndex = props.pointIndex,
        pointIndex = _props$pointIndex === undefined ? -1 : _props$pointIndex,
        barStrokeColors = props.barStrokeColors,
        _style$strokeWidth = style.strokeWidth,
        strokeWidth = _style$strokeWidth === undefined ? 0 : _style$strokeWidth,
        _width = barWidth || (points && points.length >= 2 ? Math.ceil(Math.max(0, points[1].x - points[0].x - strokeWidth)) : 0);

    return _react2.default.createElement(
        'g',
        null,
        points.map(function (p, i) {
            var x = p.x,
                y = p.y,
                _style = i === pointIndex ? Object.assign({}, style, { fill: barStrokeColors[(0, _calcDirection2.default)(points, pointIndex)] }) : style;

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

process.env.NODE_ENV !== "production" ? SparklinesBars.propTypes = {
    points: _propTypes2.default.arrayOf(_propTypes2.default.object),
    height: _propTypes2.default.number,
    style: _propTypes2.default.object,
    barWidth: _propTypes2.default.number
} : void 0;
SparklinesBars.defaultProps = {
    style: { fill: 'slategray' },
    barStrokeColors: {
        '-1': 'red',
        '0': 'black',
        '1': 'green'
    }
};

exports.default = SparklinesBars;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn-sparklines\SparklinesBars.js.map