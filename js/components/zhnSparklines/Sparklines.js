'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SparklinesReferenceLine = exports.SparklinesBars = exports.SparklinesSpot = exports.SparklinesSpots = exports.SparklinesLine = exports.Sparklines = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SparklinesLine = require('./SparklinesLine');

var _SparklinesLine2 = _interopRequireDefault(_SparklinesLine);

var _SparklinesSpots = require('./SparklinesSpots');

var _SparklinesSpots2 = _interopRequireDefault(_SparklinesSpots);

var _SparklinesSpot = require('./SparklinesSpot');

var _SparklinesSpot2 = _interopRequireDefault(_SparklinesSpot);

var _SparklinesBars = require('./SparklinesBars');

var _SparklinesBars2 = _interopRequireDefault(_SparklinesBars);

var _SparklinesReferenceLine = require('./SparklinesReferenceLine');

var _SparklinesReferenceLine2 = _interopRequireDefault(_SparklinesReferenceLine);

var _dataToPoints = require('./dataProcessing/dataToPoints');

var _dataToPoints2 = _interopRequireDefault(_dataToPoints);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

//import SparklinesCurve from './SparklinesCurve';
//import SparklinesNormalBand from './SparklinesNormalBand';

var Sparklines = function (_React$Component) {
    _inherits(Sparklines, _React$Component);

    function Sparklines(props) {
        _classCallCheck(this, Sparklines);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Sparklines).call(this, props));
    }

    _createClass(Sparklines, [{
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate(nextProps) {
            return (0, _reactAddonsShallowCompare2.default)(this, nextProps);
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props;
            var data = _props.data;
            var limit = _props.limit;
            var width = _props.width;
            var height = _props.height;
            var svgWidth = _props.svgWidth;
            var svgHeight = _props.svgHeight;
            var preserveAspectRatio = _props.preserveAspectRatio;
            var margin = _props.margin;
            var style = _props.style;
            var max = _props.max;
            var min = _props.min;


            if (data.length === 0) return null;

            var points = (0, _dataToPoints2.default)({ data: data, limit: limit, width: width, height: height, margin: margin, max: max, min: min });

            var svgOpts = { style: style, viewBox: '0 0 ' + width + ' ' + height, preserveAspectRatio: preserveAspectRatio };
            if (svgWidth > 0) svgOpts.width = svgWidth;
            if (svgHeight > 0) svgOpts.height = svgHeight;

            return _react2.default.createElement(
                'svg',
                svgOpts,
                _react2.default.Children.map(this.props.children, function (child) {
                    return _react2.default.cloneElement(child, { points: points, width: width, height: height, margin: margin });
                })
            );
        }
    }]);

    return Sparklines;
}(_react2.default.Component);

Sparklines.propTypes = {
    data: _react2.default.PropTypes.array,
    limit: _react2.default.PropTypes.number,
    width: _react2.default.PropTypes.number,
    height: _react2.default.PropTypes.number,
    svgWidth: _react2.default.PropTypes.number,
    svgHeight: _react2.default.PropTypes.number,
    preserveAspectRatio: _react2.default.PropTypes.string,
    margin: _react2.default.PropTypes.number,
    style: _react2.default.PropTypes.object,
    min: _react2.default.PropTypes.number,
    max: _react2.default.PropTypes.number
};

Sparklines.defaultProps = {
    data: [],
    width: 240,
    height: 60,
    //Scale the graphic content of the given element non-uniformly if necessary such that the element's bounding box exactly matches the viewport rectangle.
    preserveAspectRatio: 'none', //https://www.w3.org/TR/SVG/coords.html#PreserveAspectRatioAttribute
    margin: 2
};

exports.Sparklines = Sparklines;
exports.SparklinesLine = _SparklinesLine2.default;
exports.SparklinesSpots = _SparklinesSpots2.default;
exports.SparklinesSpot = _SparklinesSpot2.default;
exports.SparklinesBars = _SparklinesBars2.default;
exports.SparklinesReferenceLine = _SparklinesReferenceLine2.default;

//export { Sparklines, SparklinesLine, SparklinesCurve, SparklinesBars, SparklinesSpots, SparklinesReferenceLine, SparklinesNormalBand }
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhnSparklines\Sparklines.js.map