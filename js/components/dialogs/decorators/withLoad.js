"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _DialogCell = _interopRequireDefault(require("../DialogCell"));

var _crCommandsWithLoad = function _crCommandsWithLoad(comp) {
  return [_react["default"].createElement(_DialogCell["default"].Button.Load, {
    key: "load",
    onClick: comp._handleLoad
  })];
};

var withLoad = function withLoad(target) {
  Object.assign(target.prototype, {
    _crCommandsWithLoad: _crCommandsWithLoad
  });
};

var _default = withLoad;
exports["default"] = _default;
//# sourceMappingURL=withLoad.js.map