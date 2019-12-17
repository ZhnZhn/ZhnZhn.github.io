"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var S = {
  ROOT: {
    position: 'relative',
    display: 'inline-block',
    backgroundColor: '#e1e1cb',
    width: 250
  },
  INPUT: {
    background: 'transparent none repeat scroll 0 0',
    border: 'medium none',
    outline: 'medium none',
    height: 30,
    paddingLeft: 10,
    color: 'green',
    width: '100%',
    fontSize: '16px',
    fontWeight: 'bold'
  }
};

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _maskValue = function _maskValue(len) {
  if (len === void 0) {
    len = 0;
  }

  var i = 0,
      str = '';

  for (i; i < len; i++) {
    str = str + 'X';
  }

  return str;
};

var InputSecret =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(InputSecret, _Component);

  function InputSecret() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.state = {
      value: ''
    };
    _this.secret = '';

    _this._handleChangeValue = function (event) {
      var _value = event.target.value,
          _length = _value.length,
          _nowLength = _this.secret.length;

      if (_length === _nowLength + 1) {
        _this.secret = _this.secret + _value[_length - 1];
      } else if (_length === _nowLength - 1) {
        _this.secret = _this.secret.substring(0, _nowLength - 1);
      } else if (_nowLength === 0) {
        _this.secret = _value;
      } else if (_length === 0) {
        _this.secret = '';
      }

      _this.setState({
        value: _maskValue(_this.secret.length)
      });
    };

    _this._handleKeyDown = function (event) {
      if (event.keyCode !== 27) {
        event.stopPropagation();
      }

      switch (event.keyCode) {
        case 13:
          if (_isFn(_this.props.onEnter)) {
            event.preventDefault();

            _this.props.onEnter(_this.secret);
          }

          break;

        case 27:
        case 46:
          if (_isFn(_this.props.onEnter)) {
            _this.props.onEnter('');
          }

          _this.clear();

          break;

        default:
          return;
      }
    };

    return _this;
  }

  var _proto = InputSecret.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        placeholder = _this$props.placeholder,
        _this$props$maxLength = _this$props.maxLength,
        maxLength = _this$props$maxLength === void 0 ? "32" : _this$props$maxLength,
        value = this.state.value;
    return _react["default"].createElement("div", {
      style: S.ROOT
    }, _react["default"].createElement("input", {
      style: S.INPUT,
      type: "password",
      name: "secret" //autoComplete="new-secret"
      ,
      autoComplete: "off",
      autoCorrect: "off",
      autoCapitalize: "off",
      spellCheck: "false",
      translate: "false",
      placeholder: placeholder,
      maxLength: maxLength,
      value: value,
      onChange: this._handleChangeValue,
      onKeyDown: this._handleKeyDown
    }));
  };

  _proto.getValue = function getValue() {
    return this.secret;
  };

  _proto.clear = function clear() {
    this.secret = '';
    this.setState({
      value: ''
    });
  };

  return InputSecret;
}(_react.Component);

var _default = InputSecret;
exports["default"] = _default;
//# sourceMappingURL=InputSecret.js.map