"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireWildcard(require("react"));

//import PropTypes from "prop-types";
var CL = {
  NUMBER_RANGE: 'input-minmax-number'
};
var S = {
  INPUT: {
    display: 'inline',
    background: 'transparent none repeat scroll 0 0',
    border: 'medium none',
    outline: 'medium none',
    height: 26,
    paddingLeft: 5,
    color: 'green',
    width: 40,
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#e1e1cb',
    marginLeft: 5,
    marginRight: 5,
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.3), 0 0 0 1px rgba(0,0,0,0.1)'
  }
};
var C = {
  BLANK: '',
  TEXT: 'text'
};

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var _isNumber = function _isNumber(n) {
  return typeof n === 'number';
};

var _initValue = function _initValue(initialValue) {
  return initialValue != null ? initialValue : C.BLANK;
};

var _isMinMaxNumber = function _isMinMaxNumber(_ref) {
  var type = _ref.type,
      min = _ref.min,
      max = _ref.max;
  return type === 'number' && _isNumber(min) && _isNumber(max);
};

var InputText = /*#__PURE__*/_react["default"].forwardRef(function (props, ref) {
  var initValue = props.initValue,
      style = props.style,
      type = props.type,
      spellCheck = props.spellCheck,
      placeholder = props.placeholder,
      _props$maxLength = props.maxLength,
      maxLength = _props$maxLength === void 0 ? 125 : _props$maxLength,
      min = props.min,
      max = props.max,
      step = props.step,
      onChange = props.onChange,
      onEnter = props.onEnter,
      _useState = (0, _react.useState)(function () {
    return _initValue(initValue);
  }),
      value = _useState[0],
      setValue = _useState[1],
      _refInput = (0, _react.useRef)(),
      _hChange = function _hChange(event) {
    var _value = event.target.value;

    if (_value.length <= maxLength) {
      setValue(_value);

      if (_isFn(onChange)) {
        onChange(_value);
      }
    }
  },
      _hKeyDown = function _hKeyDown(event) {
    var code = event.code,
        keyCode = event.keyCode,
        _code = code || keyCode;

    switch (_code) {
      case 'Delete':
      case 46:
        event.preventDefault();
        setValue(C.BLANK);
        break;

      case 'Enter':
      case 13:
        if (_isFn(onEnter)) {
          onEnter(event.target.value);
        }

        break;

      default:
        return;
    }
  };

  (0, _react.useEffect)(function () {
    return setValue(_initValue(initValue));
  }, [initValue]);
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      getValue: function getValue() {
        return ('' + value).trim();
      },
      setValue: setValue,
      focus: function focus() {
        return _refInput.current.focus();
      }
    };
  }, [value]);

  var _autoCorrect = spellCheck ? "on" : "off",
      _spellCheck = spellCheck ? "true" : "false",
      _className = _isMinMaxNumber(props) ? CL.NUMBER_RANGE : void 0;

  return /*#__PURE__*/_react["default"].createElement("input", {
    ref: _refInput,
    className: _className,
    style: (0, _extends2["default"])({}, S.INPUT, style),
    type: type || C.TEXT,
    name: C.TEXT,
    autoCapitalize: C.OFF,
    autoComplete: C.OFF,
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
exports["default"] = _default;
//# sourceMappingURL=InputText.js.map