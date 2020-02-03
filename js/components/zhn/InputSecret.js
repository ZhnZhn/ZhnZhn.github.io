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
    width: 250,
    backgroundColor: '#e1e1cb'
  },
  INPUT: {
    color: 'green',
    width: '100%',
    height: 30,
    paddingLeft: 10,
    background: 'transparent none repeat scroll 0 0',
    border: 'medium none',
    outline: 'medium none',
    fontSize: '16px',
    fontWeight: 'bold'
  }
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

    _this._hInputChange = function (event) {
      _this.setState({
        value: event.target.value.trim()
      });
    };

    _this._clearAttrValue = function () {
      _this._clearId = setTimeout(function () {
        var _input = _this._input;

        if (_input && _input.hasAttribute('value')) {
          _input.removeAttribute('value');
        }
      });
    };

    _this._hKeyDown = function (event) {
      if (event.keyCode !== 27) {
        event.stopPropagation();
      }

      switch (event.keyCode) {
        case 13:
          event.preventDefault();

          _this.props.onEnter(_this.state.value);

          break;

        case 27:
        case 46:
          _this.props.onEnter('');

          _this.clear();

          break;

        default:
          return;
      }
    };

    _this._refInput = function (n) {
      return _this._input = n;
    };

    return _this;
  }

  var _proto = InputSecret.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        name = _this$props.name,
        placeholder = _this$props.placeholder,
        maxLength = _this$props.maxLength,
        value = this.state.value;
    return _react["default"].createElement("div", {
      style: S.ROOT
    }, _react["default"].createElement("input", {
      hidden: true,
      autoComplete: "username",
      value: name,
      readOnly: true
    }), _react["default"].createElement("input", {
      ref: this._refInput,
      style: S.INPUT,
      type: "password",
      autoComplete: "current-password",
      placeholder: placeholder,
      maxLength: maxLength,
      value: value,
      onChange: this._hInputChange,
      onKeyDown: this._hKeyDown
    }));
  };

  _proto.componentDidUpdate = function componentDidUpdate() {
    this._clearAttrValue();
  };

  _proto.getValue = function getValue() {
    return this.state.value;
  };

  _proto.clear = function clear() {
    this.setState({
      value: ''
    });
  };

  return InputSecret;
}(_react.Component);

InputSecret.defaultProps = {
  maxLength: "32",
  onEnter: function onEnter() {}
};
var _default = InputSecret;
exports["default"] = _default;
//# sourceMappingURL=InputSecret.js.map