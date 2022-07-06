"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _useInputKeyDown = _interopRequireDefault(require("./useInputKeyDown"));

var _Input = require("./Input.Style");

var _jsxRuntime = require("react/jsx-runtime");

//import PropTypes from "prop-types";
const CL_NUMBER_RANGE = 'input-minmax-number';
const S_INPUT_TEXT = { ..._Input.S_INPUT,
  display: 'inline',
  width: 40,
  paddingLeft: 5,
  marginLeft: 5,
  marginRight: 5,
  height: 26,
  backgroundColor: '#e1e1cb',
  boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
};
const BLANK = '',
      TEXT = 'text',
      OFF = "off";

const _isFn = fn => typeof fn === 'function';

const _isNumber = n => typeof n === 'number';

const _initValue = initialValue => initialValue != null ? initialValue : BLANK;

const _isMinMaxNumber = _ref => {
  let {
    type,
    min,
    max
  } = _ref;
  return type === 'number' && _isNumber(min) && _isNumber(max);
};

const InputText = /*#__PURE__*/(0, _react.forwardRef)((props, ref) => {
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
    onChange,
    onEnter
  } = props,
        [value, setValue] = (0, _react.useState)(() => _initValue(initValue)),
        _refInput = (0, _react.useRef)(),
        _hChange = event => {
    const _value = event.target.value;

    if (_value.length <= maxLength) {
      setValue(_value);

      if (_isFn(onChange)) {
        onChange(_value);
      }
    }
  },
        _hKeyDown = (0, _useInputKeyDown.default)({
    onEnter,
    onDelete: () => setValue(BLANK)
  }, [onEnter]);

  (0, _react.useEffect)(() => setValue(_initValue(initValue)), [initValue]);
  (0, _react.useImperativeHandle)(ref, () => ({
    getValue: () => ('' + value).trim(),
    setValue: setValue,
    focus: () => _refInput.current.focus()
  }), [value]);

  const [_autoCorrect, _spellCheck] = spellCheck ? ["on", "true"] : ["off", "false"],
        _className = _isMinMaxNumber(props) ? CL_NUMBER_RANGE : void 0;

  return /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
    ref: _refInput,
    className: _className,
    style: { ...S_INPUT_TEXT,
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

var _default = InputText;
exports.default = _default;
//# sourceMappingURL=InputText.js.map