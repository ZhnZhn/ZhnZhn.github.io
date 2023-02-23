"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _ThemeContext = _interopRequireDefault(require("./ThemeContext"));
var _jsxRuntime = require("react/jsx-runtime");
const withThemeRef = Wrapper => (0, _uiApi.forwardRef)((props, ref) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_ThemeContext.default.Consumer, {
  children: theme => /*#__PURE__*/(0, _jsxRuntime.jsx)(Wrapper, {
    ...props,
    theme: theme,
    ref: ref
  })
}));
var _default = withThemeRef;
exports.default = _default;
//# sourceMappingURL=withThemeRef.js.map