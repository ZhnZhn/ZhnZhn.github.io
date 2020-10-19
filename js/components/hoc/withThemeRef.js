"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _react = require("react");

var _ThemeContext = _interopRequireDefault(require("./ThemeContext"));

var withThemeRef = function withThemeRef(Wrapper) {
  return /*#__PURE__*/(0, _react.forwardRef)(function (props, ref) {
    return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ThemeContext["default"].Consumer, {
      children: function children(theme) {
        return /*#__PURE__*/(0, _jsxRuntime.jsx)(Wrapper, (0, _extends2["default"])({}, props, {
          theme: theme,
          ref: ref
        }));
      }
    });
  });
};

var _default = withThemeRef;
exports["default"] = _default;
//# sourceMappingURL=withThemeRef.js.map