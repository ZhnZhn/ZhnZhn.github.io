/**
 * @jest-environment jsdom
 */
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _uiTheme = _interopRequireDefault(require("../styles/uiTheme"));

var _ThemeContext = _interopRequireDefault(require("../hoc/ThemeContext"));

var wrapByUiThemeProvider = function wrapByUiThemeProvider(ui) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ThemeContext["default"].Provider, {
    value: _uiTheme["default"],
    children: ui
  });
};

var _default = wrapByUiThemeProvider;
exports["default"] = _default;
//# sourceMappingURL=wrapByUiThemeProvider.js.map