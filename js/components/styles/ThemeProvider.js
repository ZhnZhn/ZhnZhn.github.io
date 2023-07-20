"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _useListen = _interopRequireDefault(require("../hooks/useListen"));
var _ThemeContext = _interopRequireDefault(require("../hoc/ThemeContext"));
var _uiTheme = _interopRequireDefault(require("./uiTheme"));
var _jsxRuntime = require("react/jsx-runtime");
const ThemeProvider = _ref => {
  let {
    actionChangeTheme,
    children
  } = _ref;
  const [theme, setTheme] = (0, _uiApi.useState)(_uiTheme.default);
  (0, _useListen.default)((actionType, themeName) => {
    if (actionType === actionChangeTheme) {
      theme.setThemeName(themeName);
      setTheme({
        ...theme
      });
    }
  });
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_ThemeContext.default.Provider, {
    value: theme,
    children: children
  });
};
var _default = ThemeProvider;
exports.default = _default;
//# sourceMappingURL=ThemeProvider.js.map