'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _safeGet = require('../../utils/safeGet');

var _safeGet2 = _interopRequireDefault(_safeGet);

var _CellSeria = require('./CellSeria');

var _CellSeria2 = _interopRequireDefault(_CellSeria);

var _Pane = require('./Pane.Style');

var _Pane2 = _interopRequireDefault(_Pane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SeriaPane = function (_Component) {
  (0, _inherits3.default)(SeriaPane, _Component);

  function SeriaPane() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SeriaPane);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SeriaPane.__proto__ || Object.getPrototypeOf(SeriaPane)).call.apply(_ref, [this].concat(args))), _this), _this._renderSeries = function (chart) {
      var series = (0, _safeGet2.default)(chart, 'series', []);
      return series.map(function (seriaOptions, index) {
        return _react2.default.createElement(_CellSeria2.default, {
          key: index,
          chart: chart,
          options: seriaOptions,
          seriaIndex: index
        });
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(SeriaPane, [{
    key: 'render',
    value: function render() {
      var chart = this.props.chart;

      return _react2.default.createElement(
        'div',
        { style: _Pane2.default.ROOT },
        this._renderSeries(chart)
      );
    }
  }]);
  return SeriaPane;
}(_react.Component);

process.env.NODE_ENV !== "production" ? SeriaPane.propTypes = {
  chart: _react.PropTypes.shape({
    series: _react.PropTypes.arrayOf(_react.PropTypes.object)
  })
} : void 0;
exports.default = SeriaPane;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\chart-config\SeriaPane.js.map