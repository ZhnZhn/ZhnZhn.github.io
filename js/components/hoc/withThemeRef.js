"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _ThemeContext = _interopRequireDefault(require("./ThemeContext"));

var withThemeRef = function withThemeRef(Wrapper) {
  return _react["default"].forwardRef(function (props, ref) {
    return _react["default"].createElement(_ThemeContext["default"].Consumer, null, function (theme) {
      return _react["default"].createElement(Wrapper, (0, _extends2["default"])({}, props, {
        theme: theme,
        ref: ref
      }));
    });
  });
};

var _default = withThemeRef;
exports["default"] = _default;
//# sourceMappingURL=withThemeRef.js.map