'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (!Math.sign) {
    Math.sign = function (x) {
        return x > 0 ? 1 : -1;
    };
}

var calcEndSpotDirection = function calcEndSpotDirection(points) {
    return points.length < 2 ? 0 : Math.sign(points[points.length - 2].y - points[points.length - 1].y);
};

var SparklinesSpots = function SparklinesSpots(props) {
    var points = props.points,
        size = props.size,
        style = props.style,
        spotColors = props.spotColors,
        startSpot = _react2.default.createElement('circle', {
        cx: points[0].x,
        cy: points[0].y,
        r: size,
        style: style
    }),
        endSpot = _react2.default.createElement('circle', {
        cx: points[points.length - 1].x,
        cy: points[points.length - 1].y,
        r: size,
        style: style || { fill: spotColors[calcEndSpotDirection(points)] }
    });

    return _react2.default.createElement(
        'g',
        null,
        style && startSpot,
        endSpot
    );
};

process.env.NODE_ENV !== "production" ? SparklinesSpots.propTypes = {
    size: _propTypes2.default.number,
    style: _propTypes2.default.object,
    spotColors: _propTypes2.default.object
} : void 0;
SparklinesSpots.defaultProps = {
    size: 2,
    spotColors: {
        '-1': 'red',
        '0': 'black',
        '1': 'green'
    }
};

exports.default = SparklinesSpots;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn-sparklines\SparklinesSpots.js.map