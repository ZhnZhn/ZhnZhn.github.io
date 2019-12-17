"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _inheritsLoose2 = _interopRequireDefault(require("@babel/runtime/helpers/inheritsLoose"));

var _react = _interopRequireWildcard(require("react"));

var _InputStyle = _interopRequireDefault(require("./InputStyle"));

//import PropTypes from "prop-types";
var _isFn = function _isFn(fn) {
  return typeof fn === "function";
};

var _getInitStateFrom = function _getInitStateFrom(_ref) {
  var initValue = _ref.initValue;
  return {
    initValue: initValue,
    value: initValue || '',
    errorInput: undefined,
    isValid: true
  };
};

var InputPattern =
/*#__PURE__*/
function (_Component) {
  (0, _inheritsLoose2["default"])(InputPattern, _Component);

  /*
   static propTypes = {
     rootStyle: PropTypes.object,
     inputStyle: PropTypes.object,
     initValue: PropTypes.string,
     placeholder: PropTypes.string,
     errorMsg: PropTypes.string,
     onTest: PropTypes.func,
     onEnter: PropTypes.func
   }
  */
  function InputPattern(_props) {
    var _this;

    _this = _Component.call(this, _props) || this;

    _this._handleChangeValue = function (event) {
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
          errorInput: undefined
        });
      }
    };

    _this._handleBlurValue = function () {
      var _this$props = _this.props,
          onTest = _this$props.onTest,
          errorMsg = _this$props.errorMsg,
          value = _this.state.value;

      if (!onTest(value)) {
        _this.setState({
          errorInput: errorMsg,
          isValid: false
        });
      } else {
        _this.setState({
          errorInput: undefined,
          isValid: true
        });
      }
    };

    _this._handleKeyDown = function (event) {
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

    _this._refInput = function (input) {
      return _this.inputPattern = input;
    };

    _this.state = _getInitStateFrom(_props);
    return _this;
  }

  InputPattern.getDerivedStateFromProps = function getDerivedStateFromProps(props, state) {
    return props.initValue !== state.initValue ? _getInitStateFrom(props) : null;
  };

  var _proto = InputPattern.prototype;

  _proto.render = function render() {
    var _this$props2 = this.props,
        rootStyle = _this$props2.rootStyle,
        inputStyle = _this$props2.inputStyle,
        _this$props2$placehol = _this$props2.placeholder,
        placeholder = _this$props2$placehol === void 0 ? 'Input Pattern' : _this$props2$placehol,
        _this$state = this.state,
        value = _this$state.value,
        errorInput = _this$state.errorInput,
        isValid = _this$state.isValid,
        _styleHr = isValid ? _InputStyle["default"].HR_VALID : _InputStyle["default"].HR_NOT_VALID;

    return _react["default"].createElement("div", {
      style: (0, _extends2["default"])({}, _InputStyle["default"].ROOT, {}, rootStyle)
    }, _react["default"].createElement("input", {
      type: "text",
      style: (0, _extends2["default"])({}, _InputStyle["default"].INPUT, {}, inputStyle),
      ref: this._refInput,
      name: "text-date" //autoComplete="new-text-date"
      ,
      autoComplete: "off",
      autoCorrect: "off",
      autoCapitalize: "off",
      spellCheck: false,
      placeholder: placeholder,
      value: value,
      onChange: this._handleChangeValue,
      onBlur: this._handleBlurValue,
      onKeyDown: this._handleKeyDown
    }), _react["default"].createElement("hr", {
      style: (0, _extends2["default"])({}, _InputStyle["default"].HR, {}, _styleHr)
    }), _react["default"].createElement("div", {
      style: _InputStyle["default"].ERR_MSG
    }, errorInput));
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

  return InputPattern;
}(_react.Component);

InputPattern.defaultProps = {
  onTest: function onTest() {
    return true;
  }
};
var _default = InputPattern;
exports["default"] = _default;
//# sourceMappingURL=InputPattern.js.map