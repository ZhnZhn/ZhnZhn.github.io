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

var SparklinesSpot = function (_React$Component) {
    _inherits(SparklinesSpot, _React$Component);

    function SparklinesSpot() {
        _classCallCheck(this, SparklinesSpot);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(SparklinesSpot).apply(this, arguments));
    }

    _createClass(SparklinesSpot, [{
        key: 'render',
        value: function render() {
            var _props = this.props;
            var points = _props.points;
            var width = _props.width;
            var height = _props.height;
            var size = _props.size;
            var style = _props.style;
            var spotColors = _props.spotColors;
            var pointIndex = _props.pointIndex;
            var pointSpot = _react2.default.createElement('circle', {
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
        }
    }]);

    return SparklinesSpot;
}(_react2.default.Component);

SparklinesSpot.propTypes = {
    size: _react2.default.PropTypes.number,
    style: _react2.default.PropTypes.object,
    spotColors: _react2.default.PropTypes.object,
    pointIndex: _react2.default.PropTypes.number
};
SparklinesSpot.defaultProps = {
    size: 2,
    spotColors: {
        '-1': 'red',
        '0': 'black',
        '1': 'green'
    }
};

exports.default = SparklinesSpot;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhnSparklines\SparklinesSpot.js.map