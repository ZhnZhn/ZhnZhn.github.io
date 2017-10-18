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
    size: _propTypes2.default.number,
    style: _propTypes2.default.object,
    spotColors: _propTypes2.default.object,
    pointIndex: _propTypes2.default.number
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
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn-sparklines\SparklinesSpot.js.map