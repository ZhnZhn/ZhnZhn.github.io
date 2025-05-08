"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _inputFn = require("../inputFn");
var _styleFn = require("../styleFn");
var _useInputKeyDown = _interopRequireDefault(require("./useInputKeyDown"));
var _BtSvgX = require("./BtSvgX");
var _ErrMsg = _interopRequireDefault(require("./ErrMsg"));
var _Input = require("./Input.Style");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const S_INPUT_PATTERN = {
    ..._Input.S_INPUT,
    width: 'calc(100% - 50px)',
    paddingLeft: 0,
    marginLeft: 10,
    marginBottom: 5
  },
  S_INPUT_BORDER = {
    borderBottomStyle: 'solid',
    borderBottomWidth: 1
  },
  S_BT_CLEAR = {
    margin: '5px 8px 0 auto'
  };
const _crInitialState = initValue => ({
  initValue,
  value: initValue,
  errorInput: void 0,
  isValid: true
});
const _crInputStyle = isValid => ({
  ...S_INPUT_BORDER,
  borderBottomColor: (0, _Input.getIsValidColor)(isValid)
});
const _crBtClearStyle = isValid => ({
  ...S_BT_CLEAR,
  stroke: (0, _Input.getIsValidColor)(isValid)
});
const DF_ON_TEST = () => true,
  DF_ON_CLEAR = () => {};
const InputPattern = (_ref, ref) => {
  let {
    refEl,
    style,
    inputStyle,
    maxLength = 64,
    initValue = '',
    placeholder = 'Input Pattern',
    errorMsg,
    onTest = DF_ON_TEST,
    onEnter,
    isClearBlank = false,
    onClear = DF_ON_CLEAR
  } = _ref;
  const _refInput = (0, _uiApi.useRef)(),
    _refGetValue = (0, _uiApi.useRef)(),
    _refIsValid = (0, _uiApi.useRef)(),
    [state, setState] = (0, _uiApi.useState)(() => _crInitialState(initValue)),
    {
      value,
      isValid,
      errorInput
    } = state,
    _hChangeValue = (0, _uiApi.useCallback)(event => {
      const {
        value
      } = event.target;
      setState(prevState => ({
        ...prevState,
        value,
        errorInput: void 0,
        isValid: onTest(value)
      }));
    }, [onTest]),
    _hKeyDown = (0, _useInputKeyDown.default)({
      onEnter,
      onDelete: () => setState(_crInitialState(initValue))
    }, [initValue, onEnter]),
    _hClear = (0, _uiApi.useCallback)(() => {
      onClear();
      (0, _uiApi.focusRefElement)(_refInput);
      setState(_crInitialState(isClearBlank ? '' : initValue));
    }, [initValue, onClear, isClearBlank]);

  /*eslint-disable react-hooks/exhaustive-deps */
  (0, _uiApi.useEffect)(() => {
    if (state.initValue !== initValue) {
      setState(_crInitialState(initValue));
    }
  }, [initValue]);
  /*state.initValue*/
  /*eslint-enable react-hooks/exhaustive-deps */

  _refGetValue.current = () => (value || '').trim();
  _refIsValid.current = () => onTest(value);
  (0, _uiApi.useImperativeHandle)(refEl, () => ({
    getValue: () => _refGetValue.current(),
    isValid: () => _refIsValid.current(),
    focus: () => (0, _uiApi.focusRefElement)(_refInput),
    showErrMsg: () => setState(prevState => ({
      ...prevState,
      isValid: false,
      errorInput: errorMsg
    }))
  }), [errorMsg]);
  const _inputStyle = _crInputStyle(isValid),
    _btClearStyle = _crBtClearStyle(isValid);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: {
      ..._Input.S_ROW,
      ...style
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: _styleFn.S_FLEX,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
        ...(0, _inputFn.crInputProps)(),
        style: {
          ...S_INPUT_PATTERN,
          ...inputStyle,
          ..._inputStyle
        },
        ref: _refInput,
        name: "text-date",
        placeholder: placeholder,
        value: value,
        maxLength: maxLength,
        onChange: _hChangeValue,
        onKeyDown: _hKeyDown
      }), value || errorInput ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_BtSvgX.BtSvgClear, {
        style: _btClearStyle,
        onClick: _hClear
      }) : null]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ErrMsg.default, {
      msg: errorInput
    })]
  });
};

/*
InputPattern.propTypes = {
  refEl: PropTypes.refEl,
  style: PropTypes.object,
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
var _default = exports.default = InputPattern;
//# sourceMappingURL=InputPattern.js.map