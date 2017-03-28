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

var _lodash = require('lodash.get');

var _lodash2 = _interopRequireDefault(_lodash);

var _CellYAxis = require('./CellYAxis');

var _CellYAxis2 = _interopRequireDefault(_CellYAxis);

var _Pane = require('./Pane.Style');

var _Pane2 = _interopRequireDefault(_Pane);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*
ROOT: {
   paddingTop: '8px',
   minWidth: '300px'
}
*/

var YAxisPane = function (_Component) {
  (0, _inherits3.default)(YAxisPane, _Component);

  function YAxisPane() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, YAxisPane);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = YAxisPane.__proto__ || Object.getPrototypeOf(YAxisPane)).call.apply(_ref, [this].concat(args))), _this), _this._renderCells = function (chart) {
      var arrAxis = (0, _lodash2.default)(chart, 'options.yAxis', []);
      return arrAxis.map(function (options, index) {
        return _react2.default.createElement(_CellYAxis2.default, {
          key: index,
          chart: chart,
          options: options,
          axisIndex: index
        });
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(YAxisPane, [{
    key: 'render',
    value: function render() {
      var chart = this.props.chart;

      return _react2.default.createElement(
        'div',
        { style: _Pane2.default.ROOT },
        this._renderCells(chart)
      );
    }
  }]);
  return YAxisPane;
}(_react.Component);

process.env.NODE_ENV !== "production" ? YAxisPane.propTypes = {
  chart: _react.PropTypes.object
} : void 0;
exports.default = YAxisPane;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\chart-config\YAxisPane.js.map