"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _useInputKeyDown = _interopRequireDefault(require("./useInputKeyDown"));
var _Hr = _interopRequireDefault(require("./Hr"));
var _ErrMsg = _interopRequireDefault(require("./ErrMsg"));
var _Input = require("./Input.Style");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const _crState = (value, errorInput, isValid) => [value, errorInput, isValid],
  _initState = value => _crState(value, null, true),
  DF_ON_TEST = () => true;
const DateField = _ref => {
  let {
    refEl,
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
  const _refInput = (0, _uiApi.useRef)(null),
    [state, setState] = (0, _uiApi.useState)(() => _initState(initialValue)),
    [value, errorInput, isValid] = state,
    _hChangeValue = evt => {
      const {
        value
      } = evt.target;
      setState(onTest(value) ? _initState(value) : _crState(value, null, false));
    },
    _hBlurValue = () => {
      setState(value !== initialValue && !onTest(value) ? _crState(value, errorMsg, false) : _crState(value, null, true));
    },
    _hKeyDown = (0, _useInputKeyDown.default)({
      onEnter,
      onDelete: () => setState(_initState(initialValue))
    }, [initialValue, onEnter]);
  (0, _uiApi.useEffect)(() => setState(_initState(initialValue)), [initialValue]);
  (0, _uiApi.useImperativeHandle)(refEl, () => ({
    getValue: () => value,
    setValue: value => {
      if (onTest(value)) {
        setState(_initState(value));
      }
    },
    isValid: () => isValid,
    focus: () => (0, _uiApi.focusRefElement)(_refInput)
  }), [value, isValid, onTest]);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      ..._Input.S_ROW,
      ...style
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      ...(0, _styleFn.crInputProps)(),
      ref: _refInput,
      style: {
        ..._Input.S_INPUT,
        ...inputStyle
      },
      name: name,
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
};

/*
 DateField.propTypes = {
   refEl: PropTypes.ref,
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
var _default = exports.default = DateField;
//# sourceMappingURL=DateField.js.map