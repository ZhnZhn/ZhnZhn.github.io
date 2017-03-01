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
  _inherits(InputSecret, _Component);

  function InputSecret() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, InputSecret);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = InputSecret.__proto__ || Object.getPrototypeOf(InputSecret)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      value: ''
    }, _this._handleChangeValue = function (event) {
      _this.secret = event.target.value;
      _this.setState({ value: _maskValue(_this.secret.length) });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(InputSecret, [{
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
          onChange: this._handleChangeValue
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