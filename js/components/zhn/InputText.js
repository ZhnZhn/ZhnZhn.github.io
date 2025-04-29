"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useInputKeyDown = _interopRequireDefault(require("./useInputKeyDown"));
var _styleFn = require("../styleFn");
var _Input = require("./Input.Style");
var _jsxRuntime = require("react/jsx-runtime");
//import PropTypes from "prop-types";

const CL_NUMBER_RANGE = 'input-minmax-number';
const S_INPUT_TEXT = {
  ..._Input.S_INPUT,
  ..._styleFn.S_BORDER_RADIUS_2,
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
  FN_NOOP = () => {};
const _initValue = initialValue => initialValue != null ? initialValue : BLANK;
const _isMinMaxNumber = (type, min, max) => type === 'number' && (0, _uiApi.isNumber)(min) && (0, _uiApi.isNumber)(max);
const InputText = _ref => {
  let {
    refEl,
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
  } = _ref;
  const [value, setValue] = (0, _uiApi.useState)(() => _initValue(initValue)),
    _refInput = (0, _uiApi.useRef)(),
    _hChange = evt => {
      const {
        value
      } = evt.target;
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
  (0, _uiApi.useImperativeHandle)(refEl, () => ({
    getValue: () => ('' + value).trim(),
    setValue,
    focus: () => (0, _uiApi.focusRefElement)(_refInput)
  }), [value]);
  const _className = _isMinMaxNumber(type, min, max) ? CL_NUMBER_RANGE : void 0;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
    ...(0, _styleFn.crInputProps)(type, spellCheck),
    ref: _refInput,
    className: _className,
    style: {
      ...S_INPUT_TEXT,
      ...style
    },
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
};

/*
 InputText.propTypes = {
   refEl: PropTypes.ref,
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