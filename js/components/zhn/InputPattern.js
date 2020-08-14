"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

var _SvgClear = _interopRequireDefault(require("./SvgClear"));

var _Input = _interopRequireDefault(require("./Input.Style"));

//import PropTypes from "prop-types";
var S = {
  INPUT: (0, _extends2["default"])({}, _Input["default"].INPUT, {
    width: 'calc(100% - 50px)',
    paddingLeft: 0,
    marginLeft: 10,
    marginBottom: 5
  }),
  INPUT_BORDER: {
    borderBottomStyle: 'solid',
    borderBottomWidth: 1
  },
  BT_CLEAR: {
    "float": 'right',
    position: 'relative',
    top: 4,
    right: 7
  }
};

var _isFn = function _isFn(fn) {
  return typeof fn === "function";
};

var ErrMsg = function ErrMsg(_ref) {
  var msg = _ref.msg;
  return msg ? /*#__PURE__*/_react["default"].createElement("div", {
    style: _Input["default"].ERR_MSG
  }, msg) : null;
};

var _getInitStateFrom = function _getInitStateFrom(_ref2) {
  var initValue = _ref2.initValue;
  return {
    initValue: initValue,
    value: initValue || '',
    errorInput: void 0,
    isValid: true
  };
};

var _getIsValidColor = function _getIsValidColor(isValid) {
  return isValid ? '#1b75bb' : '#f44336';
};

var _crInputStyle = function _crInputStyle(isValid) {
  return (0, _extends2["default"])({}, S.INPUT_BORDER, {
    borderBottomColor: _getIsValidColor(isValid)
  });
};

var _crBtClearStyle = function _crBtClearStyle(isValid) {
  return (0, _extends2["default"])({}, S.BT_CLEAR, {
    stroke: _getIsValidColor(isValid)
  });
};

var InputPattern = /*#__PURE__*/function (_Component) {
  (0, _inheritsLoose2["default"])(InputPattern, _Component);

  /*
   static propTypes = {
     rootStyle: PropTypes.object,
     inputStyle: PropTypes.object,
     initValue: PropTypes.string,
     placeholder: PropTypes.string,
     maxLength: PropTypes.oneOfType([
       PropTypes.string,
       PropTypes.number
     ]),
     errorMsg: PropTypes.string,
     onTest: PropTypes.func,
     onEnter: PropTypes.func,
     onClear: PropTypes.func
   }
  */
  function InputPattern(_props) {
    var _this;

    _this = _Component.call(this, _props) || this;

    _this._hChangeValue = function (event) {
      var onTest = _this.props.onTest,
          value = event.target.value;

      if (!onTest(value)) {
        _this.setState({
          value: value,
          isValid: false
        });
      } else {
        _this.setState({
          value: value,
          isValid: true,
          errorInput: void 0
        });
      }
    };

    _this._hKeyDown = function (event) {
      switch (event.keyCode) {
        case 13:
          if (_isFn(_this.props.onEnter)) {
            _this.props.onEnter(event.target.value);
          }

          break;

        case 27:
        case 46:
          event.preventDefault();

          _this.setState(function (prevState, props) {
            return _getInitStateFrom(props);
          });

          break;

        default:
          return;
      }
    };

    _this._hClear = function () {
      _this.props.onClear();

      if (_this.inputPattern) {
        _this.inputPattern.focus();
      }

      _this.setState({
        value: '',
        isValid: true,
        errorInput: void 0
      });
    };

    _this._refInput = function (input) {
      return _this.inputPattern = input;
    };

    _this._refBtClear = function (bt) {
      return _this._btClear = bt;
    };

    _this.state = _getInitStateFrom(_props);
    return _this;
  }

  InputPattern.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
    return props.initValue !== state.initValue ? _getInitStateFrom(props) : null;
  };

  var _proto = InputPattern.prototype;

  _proto.render = function render() {
    var _this$props = this.props,
        rootStyle = _this$props.rootStyle,
        inputStyle = _this$props.inputStyle,
        placeholder = _this$props.placeholder,
        maxLength = _this$props.maxLength,
        _this$state = this.state,
        value = _this$state.value,
        errorInput = _this$state.errorInput,
        isValid = _this$state.isValid,
        _inputStyle = _crInputStyle(isValid),
        _btClearStyle = _crBtClearStyle(isValid);

    return /*#__PURE__*/_react["default"].createElement("div", {
      style: (0, _extends2["default"])({}, _Input["default"].ROOT, rootStyle)
    }, /*#__PURE__*/_react["default"].createElement("input", {
      type: "text",
      style: (0, _extends2["default"])({}, S.INPUT, inputStyle, _inputStyle),
      ref: this._refInput,
      name: "text-date" //autoComplete="new-text-date"
      ,
      autoComplete: "off",
      autoCorrect: "off",
      autoCapitalize: "off",
      spellCheck: false,
      placeholder: placeholder,
      value: value,
      maxLength: maxLength,
      onChange: this._hChangeValue,
      onKeyDown: this._hKeyDown
    }), value || errorInput ? /*#__PURE__*/_react["default"].createElement(_SvgClear["default"], {
      ref: this._refBtClear,
      style: _btClearStyle,
      onClick: this._hClear
    }) : null, /*#__PURE__*/_react["default"].createElement(ErrMsg, {
      msg: errorInput
    }));
  };

  _proto.getValue = function getValue() {
    return String(this.state.value).trim();
  };

  _proto.isValid = function isValid() {
    return this.props.onTest(this.state.value);
  };

  _proto.focusInput = function focusInput() {
    this.inputPattern.focus();
  };

  _proto.showErrMsg = function showErrMsg() {
    this.setState({
      errorInput: this.props.errorMsg,
      isValid: false
    });
  };

  return InputPattern;
}(_react.Component);

InputPattern.defaultProps = {
  maxLength: 64,
  placeholder: 'Input Pattern',
  onTest: function onTest() {
    return true;
  },
  onClear: function onClear() {}
};
var _default = InputPattern;
exports["default"] = _default;
//# sourceMappingURL=InputPattern.js.map