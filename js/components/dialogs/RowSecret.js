'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _class, _temp2;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _InputSecret = require('../zhn/InputSecret');

var _InputSecret2 = _interopRequireDefault(_InputSecret);

var _DialogStyles = require('../styles/DialogStyles');

var _DialogStyles2 = _interopRequireDefault(_DialogStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RowSecret = (_temp2 = _class = function (_Component) {
  (0, _inherits3.default)(RowSecret, _Component);

  function RowSecret() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, RowSecret);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RowSecret.__proto__ || Object.getPrototypeOf(RowSecret)).call.apply(_ref, [this].concat(args))), _this), _this._refInput = function (comp) {
      return _this.inputComp = comp;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(RowSecret, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          title = _props.title,
          titleStyle = _props.titleStyle,
          rest = (0, _objectWithoutProperties3.default)(_props, ['title', 'titleStyle']);

      return _react2.default.createElement(
        'form',
        null,
        _react2.default.createElement(
          'label',
          { style: _DialogStyles2.default.rowDiv },
          _react2.default.createElement(
            'span',
            { style: (0, _extends3.default)({}, _DialogStyles2.default.labelSpan, titleStyle) },
            title
          ),
          _react2.default.createElement(_InputSecret2.default, (0, _extends3.default)({
            ref: this._refInput
          }, rest))
        )
      );
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.inputComp.getValue();
    }
  }, {
    key: 'clear',
    value: function clear() {
      this.inputComp.clear();
    }
  }]);
  return RowSecret;
}(_react.Component), _class.defaultProps = {
  title: ''
}, _temp2);
exports.default = RowSecret;
//# sourceMappingURL=RowSecret.js.map