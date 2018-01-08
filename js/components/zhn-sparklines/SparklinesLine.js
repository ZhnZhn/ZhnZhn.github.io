'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SparklinesLine = function SparklinesLine(props) {
    var _props$points = props.points,
        points = _props$points === undefined ? [] : _props$points,
        height = props.height,
        margin = props.margin,
        color = props.color,
        style = props.style,
        linePoints = points.map(function (p) {
        return [p.x, p.y];
    }).reduce(function (a, b) {
        return a.concat(b);
    }),
        closePolyPoints = [points[points.length - 1].x, height - margin, margin, height - margin, margin, points[0].y],
        fillPoints = linePoints.concat(closePolyPoints),
        lineStyle = {
        stroke: color || style.stroke || 'slategray',
        strokeWidth: style.strokeWidth || '1',
        strokeLinejoin: style.strokeLinejoin || 'round',
        strokeLinecap: style.strokeLinecap || 'round',
        fill: 'none'
    },
        fillStyle = {
        stroke: style.stroke || 'none',
        strokeWidth: '0',
        fillOpacity: style.fillOpacity || '.1',
        fill: style.fill || color || 'slategray'
    };


    return _react2.default.createElement(
        'g',
        null,
        _react2.default.createElement('polyline', { points: fillPoints.join(' '), style: fillStyle }),
        _react2.default.createElement('polyline', { points: linePoints.join(' '), style: lineStyle })
    );
};

SparklinesLine.propTypes = process.env.NODE_ENV !== "production" ? {
    color: _propTypes2.default.string,
    style: _propTypes2.default.object
} : {};
SparklinesLine.defaultProps = {
    style: {}
};

exports.default = SparklinesLine;
//# sourceMappingURL=SparklinesLine.js.map