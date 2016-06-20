'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SparklinesLine = function (_React$Component) {
    _inherits(SparklinesLine, _React$Component);

    function SparklinesLine() {
        _classCallCheck(this, SparklinesLine);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(SparklinesLine).apply(this, arguments));
    }

    _createClass(SparklinesLine, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var points = _props.points;
            var width = _props.width;
            var height = _props.height;
            var margin = _props.margin;
            var color = _props.color;
            var style = _props.style;
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
        }
    }]);

    return SparklinesLine;
}(_react2.default.Component);

SparklinesLine.propTypes = {
    color: _react2.default.PropTypes.string,
    style: _react2.default.PropTypes.object
};
SparklinesLine.defaultProps = {
    style: {}
};

exports.default = SparklinesLine;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhnSparklines\SparklinesLine.js.map