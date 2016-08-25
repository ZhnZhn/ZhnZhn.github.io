'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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
    var points = props.points;
    var size = props.size;
    var style = props.style;
    var spotColors = props.spotColors;
    var startSpot = _react2.default.createElement('circle', {
        cx: points[0].x,
        cy: points[0].y,
        r: size,
        style: style
    });
    var endSpot = _react2.default.createElement('circle', {
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

SparklinesSpots.propTypes = {
    size: _react2.default.PropTypes.number,
    style: _react2.default.PropTypes.object,
    spotColors: _react2.default.PropTypes.object
};
SparklinesSpots.defaultProps = {
    size: 2,
    spotColors: {
        '-1': 'red',
        '0': 'black',
        '1': 'green'
    }
};

exports.default = SparklinesSpots;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhnSparklines\SparklinesSpots.js.map