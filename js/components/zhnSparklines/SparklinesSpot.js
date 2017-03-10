'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _calcDirection = require('./dataProcessing/calcDirection');

var _calcDirection2 = _interopRequireDefault(_calcDirection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SparklinesSpot = function SparklinesSpot(props) {
    var points = props.points,
        size = props.size,
        style = props.style,
        spotColors = props.spotColors,
        pointIndex = props.pointIndex,
        pointSpot = _react2.default.createElement('circle', {
        cx: points[pointIndex].x,
        cy: points[pointIndex].y,
        r: size,
        style: style || { fill: spotColors[(0, _calcDirection2.default)(points, pointIndex)] }
    });

    return _react2.default.createElement(
        'g',
        null,
        pointSpot
    );
};

process.env.NODE_ENV !== "production" ? SparklinesSpot.propTypes = {
    size: _react2.default.PropTypes.number,
    style: _react2.default.PropTypes.object,
    spotColors: _react2.default.PropTypes.object,
    pointIndex: _react2.default.PropTypes.number
} : void 0;
SparklinesSpot.defaultProps = {
    size: 2,
    spotColors: {
        '-1': 'red',
        '0': 'black',
        '1': 'green'
    }
};

exports.default = SparklinesSpot;
//# sourceMappingURL=SparklinesSpot.js.map