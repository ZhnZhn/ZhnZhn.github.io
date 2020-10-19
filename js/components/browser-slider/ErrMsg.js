"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _Style = _interopRequireDefault(require("./Style"));

var ErrMsg = function ErrMsg(_ref) {
  var errMsg = _ref.errMsg;
  if (!errMsg) return null;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: _Style["default"].MSG_ERR,
    children: errMsg
  });
};

var _default = ErrMsg;
exports["default"] = _default;
//# sourceMappingURL=ErrMsg.js.map