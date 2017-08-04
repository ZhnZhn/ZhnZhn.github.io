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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  rootDiv: {
    position: 'relative',
    display: 'inline-block',
    backgroundColor: '#E1E1CB',
    width: '250px'
  },
  inputText: {
    background: 'transparent none repeat scroll 0 0',
    border: 'medium none',
    outline: 'medium none',
    height: '30px',
    paddingLeft: '10px',
    color: 'green',
    width: '100%',
    fontSize: '16px',
    fontWeight: 'bold'
  }
};

var _maskValue = function _maskValue() {
  var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

  var i = 0,
      str = '';
  for (i; i < len; i++) {
    str = str + 'X';
  }
  return str;
};

var InputSecret = function (_Component) {
  (0, _inherits3.default)(InputSecret, _Component);

  function InputSecret() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, InputSecret);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = InputSecret.__proto__ || Object.getPrototypeOf(InputSecret)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      value: ''
    }, _this._handleChangeValue = function (event) {
      _this.secret = event.target.value;
      _this.setState({ value: _maskValue(_this.secret.length) });
    }, _this._handleKeyDown = function (event) {
      switch (event.keyCode) {
        case 13:
          if (typeof _this.props.onEnter === 'function') {
            _this.props.onEnter(event.target.value);
          }
          break;
        default:
          return;
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(InputSecret, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          placeholder = _props.placeholder,
          _props$maxLength = _props.maxLength,
          maxLength = _props$maxLength === undefined ? "32" : _props$maxLength,
          value = this.state.value;

      return _react2.default.createElement(
        'div',
        { style: styles.rootDiv },
        _react2.default.createElement('input', {
          name: 'secret',
          autoComplete: 'new-secret',
          autoCorrect: 'off',
          autoCapitalize: 'off',
          spellCheck: false,
          type: 'password',
          style: styles.inputText,
          translate: false,
          placeholder: placeholder,
          maxLength: maxLength,
          defaultValue: value,
          onChange: this._handleChangeValue,
          onKeyDown: this._handleKeyDown
        })
      );
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      return this.secret;
    }
  }]);
  return InputSecret;
}(_react.Component);

exports.default = InputSecret;
//# sourceMappingURL=D:\_Dev\_React\_ERC\js\components\zhn\InputSecret.js.map