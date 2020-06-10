"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Style = _interopRequireDefault(require("./Style"));

var ErrMsg = function ErrMsg(_ref) {
  var errMsg = _ref.errMsg;
  if (!errMsg) return null;
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: _Style["default"].MSG_ERR
  }, errMsg);
};

var _default = ErrMsg;
exports["default"] = _default;
//# sourceMappingURL=ErrMsg.js.map