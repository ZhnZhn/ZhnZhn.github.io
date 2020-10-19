"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _useInputKeyDown = _interopRequireDefault(require("./useInputKeyDown"));

var S = {
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

var _onEnter = function _onEnter() {};

var InputSecret = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var name = _ref.name,
      placeholder = _ref.placeholder,
      _ref$maxLength = _ref.maxLength,
      maxLength = _ref$maxLength === void 0 ? "32" : _ref$maxLength,
      _ref$onEnter = _ref.onEnter,
      onEnter = _ref$onEnter === void 0 ? _onEnter : _ref$onEnter;

  var _refInput = (0, _react.useRef)(),
      _refEnter = (0, _react.useRef)(function () {
    return '';
  }),
      _useState = (0, _react.useState)(''),
      value = _useState[0],
      setValue = _useState[1],
      _hInputChange = (0, _react.useCallback)(function (event) {
    setValue(event.target.value.trim());
  }, []),
      _hKeyDown = (0, _useInputKeyDown["default"])({
    onEnter: function onEnter() {
      return _refEnter.current();
    },
    onDelete: function onDelete() {
      onEnter('');
      setValue('');
    }
  }, [onEnter]);

  _refEnter.current = function () {
    return onEnter(value);
  };

  (0, _react.useImperativeHandle)(ref, function () {
    return {
      getValue: function getValue() {
        return value;
      },
      clear: function clear() {
        return setValue('');
      }
    };
  }, [value]);
  (0, _react.useEffect)(function () {
    setTimeout(function () {
      var _input = _refInput.current;

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
exports["default"] = _default;
//# sourceMappingURL=InputSecret.js.map