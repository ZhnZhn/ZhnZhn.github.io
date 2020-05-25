"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _MenuBrowserDynamic = _interopRequireDefault(require("../zhn-menu/MenuBrowserDynamic"));

var SourceBrowserDynamic = _react["default"].memo(function (props) {
  return _react["default"].createElement(_MenuBrowserDynamic["default"], props);
}, function () {
  return true;
});

var _default = SourceBrowserDynamic;
exports["default"] = _default;
//# sourceMappingURL=SourceBrowserDynamic.js.map