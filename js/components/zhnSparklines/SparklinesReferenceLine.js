'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _index = require('./dataProcessing/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SparklinesReferenceLine = function (_React$Component) {
    _inherits(SparklinesReferenceLine, _React$Component);

    function SparklinesReferenceLine() {
        _classCallCheck(this, SparklinesReferenceLine);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(SparklinesReferenceLine).apply(this, arguments));
    }

    _createClass(SparklinesReferenceLine, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var points = _props.points;
            var margin = _props.margin;
            var type = _props.type;
            var style = _props.style;
            var value = _props.value;
            var ypoints = points.map(function (p) {
                return p.y;
            });
            var y = type === 'custom' ? value : _index.hm[type](ypoints);

            return _react2.default.createElement('line', {
                x1: points[0].x, y1: y + margin,
                x2: points[points.length - 1].x, y2: y + margin,
                style: style });
        }
    }]);

    return SparklinesReferenceLine;
}(_react2.default.Component);

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
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhnSparklines\SparklinesReferenceLine.js.map