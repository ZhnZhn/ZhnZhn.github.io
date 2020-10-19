"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _useInputKeyDown = _interopRequireDefault(require("./useInputKeyDown"));

var _Input = _interopRequireDefault(require("./Input.Style"));

//import PropTypes from "prop-types";
var _initState = function _initState(value) {
  return {
    value: value,
    errorInput: null,
    isValid: true
  };
};

var _onTest = function _onTest() {
  return true;
};

var DateField = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var style = _ref.style,
      inputStyle = _ref.inputStyle,
      _ref$initialValue = _ref.initialValue,
      initialValue = _ref$initialValue === void 0 ? '' : _ref$initialValue,
      _ref$placeholder = _ref.placeholder,
      placeholder = _ref$placeholder === void 0 ? 'YYYY-MM-DD' : _ref$placeholder,
      _ref$inputmode = _ref.inputmode,
      inputmode = _ref$inputmode === void 0 ? 'numeric' : _ref$inputmode,
      _ref$name = _ref.name,
      name = _ref$name === void 0 ? 'text-date' : _ref$name,
      _ref$maxLength = _ref.maxLength,
      maxLength = _ref$maxLength === void 0 ? 10 : _ref$maxLength,
      _ref$errorMsg = _ref.errorMsg,
      errorMsg = _ref$errorMsg === void 0 ? null : _ref$errorMsg,
      _ref$onTest = _ref.onTest,
      onTest = _ref$onTest === void 0 ? _onTest : _ref$onTest,
      onEnter = _ref.onEnter;

  var _refInput = (0, _react.useRef)(null),
      _useState = (0, _react.useState)(function () {
    return _initState(initialValue);
  }),
      state = _useState[0],
      setState = _useState[1],
      value = state.value,
      errorInput = state.errorInput,
      _isValid = state.isValid,
      _hChangeValue = function _hChangeValue(event) {
    var value = event.target.value;

    if (!onTest(value)) {
      setState({
        value: value,
        isValid: false,
        errorInput: null
      });
    } else {
      setState(_initState(value));
    }
  },
      _hBlurValue = function _hBlurValue() {
    if (value !== initialValue && !onTest(value)) {
      setState({
        value: value,
        errorInput: errorMsg,
        isValid: false
      });
    } else {
      setState({
        value: value,
        errorInput: null,
        isValid: true
      });
    }
  },
      _hKeyDown = (0, _useInputKeyDown["default"])({
    onEnter: onEnter,
    onDelete: function onDelete() {
      return setState(_initState(initialValue));
    }
  }, [initialValue]);

  (0, _react.useEffect)(function () {
    return setState(_initState(initialValue));
  }, [initialValue]);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      getValue: function getValue() {
        return value;
      },
      setValue: function setValue(value) {
        if (onTest(value)) {
          setState(_initState(value));
        }
      },
      isValid: function isValid() {
        return _isValid;
      },
      focus: function focus() {
        return _refInput.current.focus();
      }
    };
  }, [value, _isValid, onTest]);

  var _styleHr = _isValid ? _Input["default"].HR_VALID : _Input["default"].HR_NOT_VALID;

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: (0, _extends2["default"])({}, _Input["default"].ROOT, style),
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      ref: _refInput,
      style: (0, _extends2["default"])({}, _Input["default"].INPUT, inputStyle),
      name: name,
      autoComplete: "off",
      autoCorrect: "off",
      autoCapitalize: "off",
      spellCheck: false,
      type: "text",
      placeholder: placeholder,
      inputMode: inputmode,
      value: value,
      maxLength: maxLength,
      onChange: _hChangeValue,
      onBlur: _hBlurValue,
      onKeyDown: _hKeyDown
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("hr", {
      style: (0, _extends2["default"])({}, _Input["default"].HR, _styleHr)
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: _Input["default"].ERR_MSG,
      children: errorInput
    })]
  });
});
/*
 DateField.propTypes = {
   style: PropTypes.object,
   inputStyle: PropTypes.object,
   initialValue: PropTypes.string,
   placeholder: PropTypes.string,
   inpumode: PropTypes.string,
   maxLength: PropTypes.number,
   errorMsg: PropTypes.string,
   onTest: PropTypes.func,
   onEnter: PropTypes.func
 }
*/

var _default = DateField;
exports["default"] = _default;
//# sourceMappingURL=DateField.js.map