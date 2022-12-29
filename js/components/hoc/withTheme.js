"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ThemeContext = _interopRequireDefault(require("./ThemeContext"));
var _jsxRuntime = require("react/jsx-runtime");
const withTheme = Wrapper => props => /*#__PURE__*/(0, _jsxRuntime.jsx)(_ThemeContext.default.Consumer, {
  children: theme => /*#__PURE__*/(0, _jsxRuntime.jsx)(Wrapper, {
    ...props,
    theme: theme
  })
});
var _default = withTheme;
exports.default = _default;
//# sourceMappingURL=withTheme.js.map