"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useInputKeyDown = _interopRequireDefault(require("./useInputKeyDown"));
var _Input = require("./Input.Style");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const CL_NUMBER_RANGE = 'input-minmax-number';
const S_INPUT_TEXT = {
  ..._Input.S_INPUT,
  ..._Input.S_BOX_SHADOW,
  display: 'inline',
  width: 40,
  paddingLeft: 5,
  marginLeft: 5,
  marginRight: 5,
  height: 26,
  backgroundColor: '#e1e1cb'
};
const BLANK = '',
  TEXT = 'text',
  OFF = "off",
  FN_NOOP = () => {};
const _initValue = initialValue => initialValue != null ? initialValue : BLANK;
const _isMinMaxNumber = _ref => {
  let {
    type,
    min,
    max
  } = _ref;
  return type === 'number' && (0, _uiApi.isNumber)(min) && (0, _uiApi.isNumber)(max);
};
const InputText = (0, _uiApi.forwardRef)((props, ref) => {
  const {
      initValue,
      style,
      type,
      spellCheck,
      placeholder,
      maxLength = 125,
      min,
      max,
      step,
      onChange = FN_NOOP,
      onEnter
    } = props,
    [value, setValue] = (0, _uiApi.useState)(() => _initValue(initValue)),
    _refInput = (0, _uiApi.useRef)(),
    _hChange = event => {
      const {
        value
      } = event.target;
      if (value.length <= maxLength) {
        setValue(value);
        onChange(value);
      }
    },
    _hKeyDown = (0, _useInputKeyDown.default)({
      onEnter,
      onDelete: () => setValue(BLANK)
    }, [onEnter]);
  (0, _uiApi.useEffect)(() => setValue(_initValue(initValue)), [initValue]);
  (0, _uiApi.useImperativeHandle)(ref, () => ({
    getValue: () => ('' + value).trim(),
    setValue,
    focus: () => (0, _uiApi.focusRefElement)(_refInput)
  }), [value]);
  const [_autoCorrect, _spellCheck] = spellCheck ? ["on", "true"] : ["off", "false"],
    _className = _isMinMaxNumber(props) ? CL_NUMBER_RANGE : void 0;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
    ref: _refInput,
    className: _className,
    style: {
      ...S_INPUT_TEXT,
      ...style
    },
    type: type || TEXT,
    name: TEXT,
    autoCapitalize: OFF,
    autoComplete: OFF,
    autoCorrect: _autoCorrect,
    spellCheck: _spellCheck,
    translate: "false",
    value: value,
    placeholder: placeholder,
    maxLength: maxLength,
    min: min,
    max: max,
    step: step,
    onChange: _hChange,
    onKeyDown: _hKeyDown
  });
});

/*
 InputText.propTypes = {
   style: PropTypes.object,
   initValue: PropTypes.string,
   type: PropTypes.string,
   placeholder: PropTypes.string,
   spellCheck: PropTypes.bool,
   maxLength: PropTypes.number,
   min: PropTypes.number,
   max: PropTypes.number,
   step: PropTypes.number,
   onEnter: PropTypes.func,
   onChange: PropTypes.func
 }
 */
var _default = exports.default = InputText;
//# sourceMappingURL=InputText.js.map