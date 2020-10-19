"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _DialogCell = _interopRequireDefault(require("../DialogCell"));

var _crCommandsWithLoad = function _crCommandsWithLoad(comp) {
  return [/*#__PURE__*/(0, _jsxRuntime.jsx)(_DialogCell["default"].Button.Load, {
    onClick: comp._handleLoad
  }, "load")];
};

var withLoad = function withLoad(target) {
  Object.assign(target.prototype, {
    _crCommandsWithLoad: _crCommandsWithLoad
  });
};

var _default = withLoad;
exports["default"] = _default;
//# sourceMappingURL=withLoad.js.map