"use strict";

exports.__esModule = true;
exports.default = void 0;

var _jsxRuntime = require("react/jsx-runtime");

var CL_ERR_MSG = "err-msg";

var _crMsgErr = function _crMsgErr(msg) {
  return ['Error occured during rendering', msg].filter(Boolean).join(' ') + '.';
};

var MsgRenderErr = function MsgRenderErr(_ref) {
  var isShow = _ref.isShow,
      style = _ref.style,
      msg = _ref.msg;
  return isShow ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: CL_ERR_MSG,
    style: style,
    children: _crMsgErr(msg)
  }) : null;
};

var _default = MsgRenderErr;
exports.default = _default;
//# sourceMappingURL=MsgRenderErr.js.map