'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

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

SparklinesReferenceLine.propTypes = {
    type: _react2.default.PropTypes.oneOf(['max', 'min', 'mean', 'avg', 'median', 'custom']),
    value: _react2.default.PropTypes.number,
    style: _react2.default.PropTypes.object
};

SparklinesReferenceLine.defaultProps = {
    type: 'mean',
    style: { stroke: 'red', strokeOpacity: .75, strokeDasharray: '2, 2' }
};

exports.default = SparklinesReferenceLine;
//# sourceMappingURL=SparklinesReferenceLine.js.map