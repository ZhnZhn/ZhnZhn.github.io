"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _HotKeysProvider = _interopRequireDefault(require("./hotkeys/HotKeysProvider"));
var _ThemeProvider = _interopRequireDefault(require("./styles/ThemeProvider"));
var _ComponentActions = require("../flux/actions/ComponentActions");
var _has = require("./has");
var _jsxRuntime = require("react/jsx-runtime");
const ENABLE_HOT_KEYS = !_has.HAS_TOUCH_EVENTS;
const AppProvider = _ref => {
  let {
    children
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_HotKeysProvider.default, {
    is: ENABLE_HOT_KEYS,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ThemeProvider.default, {
      actionChangeTheme: _ComponentActions.CAT_CHANGE_THEME,
      children: children
    })
  });
};
var _default = AppProvider;
exports.default = _default;
//# sourceMappingURL=AppProvider.js.map