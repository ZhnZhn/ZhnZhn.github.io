"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _HotKeysContext = _interopRequireDefault(require("./HotKeysContext"));

var _HotKeysHandler = _interopRequireDefault(require("./HotKeysHandler"));

var _jsxRuntime = require("react/jsx-runtime");

const hmHotKeys = Object.create(null);

const HotKeysProvider = _ref => {
  let {
    is,
    children
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_HotKeysContext.default.Provider, {
    value: hmHotKeys,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_HotKeysHandler.default, {
      is: is
    }), children]
  });
};

var _default = HotKeysProvider;
exports.default = _default;
//# sourceMappingURL=HotKeysProvider.js.map