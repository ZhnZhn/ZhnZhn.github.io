"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _useInputKeyDown = _interopRequireDefault(require("./useInputKeyDown"));

var _Hr = _interopRequireDefault(require("./Hr"));

var _ErrMsg = _interopRequireDefault(require("./ErrMsg"));

var _Input = require("./Input.Style");

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
const _initState = value => ({
  value,
  errorInput: null,
  isValid: true
});

const DF_ON_TEST = () => true;

const DateField = /*#__PURE__*/(0, _react.forwardRef)((_ref, ref) => {
  let {
    style,
    inputStyle,
    initialValue = '',
    placeholder = 'YYYY-MM-DD',
    inputmode = 'numeric',
    name = 'text-date',
    maxLength = 10,
    errorMsg = null,
    onTest = DF_ON_TEST,
    onEnter
  } = _ref;

  const _refInput = (0, _react.useRef)(null),
        [state, setState] = (0, _react.useState)(() => _initState(initialValue)),
        {
    value,
    errorInput,
    isValid
  } = state,
        _hChangeValue = event => {
    const value = event.target.value;

    if (!onTest(value)) {
      setState({
        value,
        isValid: false,
        errorInput: null
      });
    } else {
      setState(_initState(value));
    }
  },
        _hBlurValue = () => {
    if (value !== initialValue && !onTest(value)) {
      setState({
        value,
        errorInput: errorMsg,
        isValid: false
      });
    } else {
      setState({
        value,
        errorInput: null,
        isValid: true
      });
    }
  },
        _hKeyDown = (0, _useInputKeyDown.default)({
    onEnter,
    onDelete: () => setState(_initState(initialValue))
  }, [initialValue]);

  (0, _react.useEffect)(() => setState(_initState(initialValue)), [initialValue]);
  (0, _react.useImperativeHandle)(ref, () => ({
    getValue: () => value,
    setValue: value => {
      if (onTest(value)) {
        setState(_initState(value));
      }
    },
    isValid: () => isValid,
    focus: () => _refInput.current.focus()
  }), [value, isValid, onTest]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: { ..._Input.S_ROW,
      ...style
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      ref: _refInput,
      style: { ..._Input.S_INPUT,
        ...inputStyle
      },
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
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Hr.default, {
      isValid: isValid
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ErrMsg.default, {
      msg: errorInput
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
exports.default = _default;
//# sourceMappingURL=DateField.js.map