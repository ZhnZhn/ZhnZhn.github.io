'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = require('./dataProcessing/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SparklinesReferenceLine = function SparklinesReferenceLine(props) {
    var points = props.points,
        margin = props.margin,
        type = props.type,
        style = props.style,
        value = props.value,
        ypoints = points.map(function (p) {
        return p.y;
    }),
        y = type === 'custom' ? value : _index.hm[type](ypoints);


    return _react2.default.createElement('line', {
        x1: points[0].x, y1: y + margin,
        x2: points[points.length - 1].x, y2: y + margin,
        style: style });
};

process.env.NODE_ENV !== "production" ? SparklinesReferenceLine.propTypes = {
    type: _propTypes2.default.oneOf(['max', 'min', 'mean', 'avg', 'median', 'custom']),
    value: _propTypes2.default.number,
    style: _propTypes2.default.object
} : void 0;

SparklinesReferenceLine.defaultProps = {
    type: 'mean',
    style: { stroke: 'red', strokeOpacity: .75, strokeDasharray: '2, 2' }
};

exports.default = SparklinesReferenceLine;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn-sparklines\SparklinesReferenceLine.js.map