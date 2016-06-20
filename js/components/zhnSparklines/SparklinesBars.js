'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _calcDirection = require('./dataProcessing/calcDirection');

var _calcDirection2 = _interopRequireDefault(_calcDirection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SparklinesBars = function (_React$Component) {
    _inherits(SparklinesBars, _React$Component);

    function SparklinesBars() {
        _classCallCheck(this, SparklinesBars);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(SparklinesBars).apply(this, arguments));
    }

    _createClass(SparklinesBars, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var points = _props.points;
            var height = _props.height;
            var style = _props.style;
            var barWidth = _props.barWidth;
            var _props$pointIndex = _props.pointIndex;
            var pointIndex = _props$pointIndex === undefined ? -1 : _props$pointIndex;
            var barStrokeColors = _props.barStrokeColors;
            var strokeWidth = 1 * (style && style.strokeWidth || 0);
            var width = barWidth || (points && points.length >= 2 ? Math.ceil(Math.max(0, points[1].x - points[0].x - strokeWidth)) : 0);

            return _react2.default.createElement(
                'g',
                null,
                points.map(function (p, i) {
                    var _style = i === pointIndex ? Object.assign({}, style, { fill: barStrokeColors[(0, _calcDirection2.default)(points, pointIndex)] }) : style;
                    return _react2.default.createElement('rect', {
                        key: i,
                        x: Math.ceil(p.x - strokeWidth * i),
                        y: Math.ceil(p.y),
                        width: Math.ceil(width),
                        height: Math.ceil(Math.max(0, height - p.y)),
                        style: _style
                    });
                })
            );
        }
    }]);

    return SparklinesBars;
}(_react2.default.Component);

SparklinesBars.propTypes = {
    points: _react2.default.PropTypes.arrayOf(_react2.default.PropTypes.object),
    height: _react2.default.PropTypes.number,
    style: _react2.default.PropTypes.object,
    barWidth: _react2.default.PropTypes.number
};
SparklinesBars.defaultProps = {
    style: { fill: 'slategray' },
    barStrokeColors: {
        '-1': 'red',
        '0': 'black',
        '1': 'green'
    }
};

exports.default = SparklinesBars;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhnSparklines\SparklinesBars.js.map