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

var _LegendItem = require('./LegendItem');

var _LegendItem2 = _interopRequireDefault(_LegendItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Legend = function (_Component) {
  (0, _inherits3.default)(Legend, _Component);

  function Legend() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Legend);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Legend.__proto__ || Object.getPrototypeOf(Legend)).call.apply(_ref, [this].concat(args))), _this), _this._renderLegend = function () {
      var legend = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var onClickItem = arguments[1];

      return legend.map(function (item, index) {
        return _react2.default.createElement(_LegendItem2.default, { key: item.name, item: item, onClickItem: onClickItem });
      });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Legend, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate(nextProps, nextState) {
      if (nextProps.legend === this.props.legend) {
        return false;
      }
      return true;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          legend = _props.legend,
          onClickItem = _props.onClickItem;

      return _react2.default.createElement(
        'div',
        null,
        this._renderLegend(legend, onClickItem)
      );
    }
  }]);
  return Legend;
}(_react.Component);

exports.default = Legend;
//# sourceMappingURL=Legend.js.map