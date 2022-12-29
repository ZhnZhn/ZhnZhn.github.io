"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _react = require("react");
var _useInputKeyDown = _interopRequireDefault(require("./useInputKeyDown"));
var _jsxRuntime = require("react/jsx-runtime");
const S = {
  ROOT: {
    position: 'relative',
    display: 'inline-block',
    width: 275,
    backgroundColor: '#e1e1cb'
  },
  INPUT: {
    color: 'green',
    width: '100%',
    height: 30,
    paddingLeft: 10,
    background: 'transparent none repeat scroll 0 0',
    border: 'medium none',
    outline: 'medium none',
    fontSize: '16px',
    fontWeight: 'bold'
  }
};
const _onEnter = () => {};
const InputSecret = /*#__PURE__*/(0, _react.forwardRef)((_ref, ref) => {
  let {
    name,
    placeholder,
    maxLength = "32",
    onEnter = _onEnter
  } = _ref;
  const _refInput = (0, _react.useRef)(),
    _refEnter = (0, _react.useRef)(() => ''),
    [value, setValue] = (0, _react.useState)(''),
    _hInputChange = (0, _react.useCallback)(event => {
      setValue(event.target.value.trim());
    }, []),
    _hKeyDown = (0, _useInputKeyDown.default)({
      onEnter: () => _refEnter.current(),
      onDelete: () => {
        onEnter('');
        setValue('');
      }
    }, [onEnter]);
  _refEnter.current = () => onEnter(value);
  (0, _react.useImperativeHandle)(ref, () => ({
    getValue: () => value,
    clear: () => setValue('')
  }), [value]);
  (0, _react.useEffect)(() => {
    setTimeout(() => {
      const _input = _refInput.current;
      if (_input && _input.hasAttribute('value')) {
        _input.removeAttribute('value');
      }
    });
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S.ROOT,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      hidden: true,
      autoComplete: "username",
      value: name,
      readOnly: true
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("input", {
      ref: _refInput,
      style: S.INPUT,
      type: "password",
      autoComplete: "current-password",
      placeholder: placeholder,
      maxLength: maxLength,
      value: value,
      onChange: _hInputChange,
      onKeyDown: _hKeyDown
    })]
  });
});
var _default = InputSecret;
exports.default = _default;
//# sourceMappingURL=InputSecret.js.map