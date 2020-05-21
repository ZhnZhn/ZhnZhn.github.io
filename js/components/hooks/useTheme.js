"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = require("react");

var _ThemeContext = _interopRequireDefault(require("../hoc/ThemeContext"));

var useTheme = function useTheme(themeId) {
  return (0, _react.useContext)(_ThemeContext["default"]).getStyle(themeId);
};

var _default = useTheme;
exports["default"] = _default;
//# sourceMappingURL=useTheme.js.map