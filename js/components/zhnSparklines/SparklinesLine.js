'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SparklinesLine = function SparklinesLine(props) {
    var _props$points = props.points;
    var points = _props$points === undefined ? [] : _props$points;
    var height = props.height;
    var margin = props.margin;
    var color = props.color;
    var style = props.style;
    var linePoints = points.map(function (p) {
        return [p.x, p.y];
    }).reduce(function (a, b) {
        return a.concat(b);
    });
    var closePolyPoints = [points[points.length - 1].x, height - margin, margin, height - margin, margin, points[0].y];
    var fillPoints = linePoints.concat(closePolyPoints);
    var lineStyle = {
        stroke: color || style.stroke || 'slategray',
        strokeWidth: style.strokeWidth || '1',
        strokeLinejoin: style.strokeLinejoin || 'round',
        strokeLinecap: style.strokeLinecap || 'round',
        fill: 'none'
    };
    var fillStyle = {
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

SparklinesLine.propTypes = {
    color: _react2.default.PropTypes.string,
    style: _react2.default.PropTypes.object
};
SparklinesLine.defaultProps = {
    style: {}
};

exports.default = SparklinesLine;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhnSparklines\SparklinesLine.js.map