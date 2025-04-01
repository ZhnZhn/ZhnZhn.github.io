"use strict";

exports.__esModule = true;
exports.default = void 0;
var _arrFn = require("../../utils/arrFn");
var _jsxRuntime = require("react/jsx-runtime");
const CL_ERR_MSG = "err-msg";
const _crMsgErr = msg => (0, _arrFn.filterBoolean)(['Error occured during rendering', msg]).join(' ') + '.';
const MsgRenderErr = _ref => {
  let {
    isShow,
    style,
    msg
  } = _ref;
  return isShow ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: CL_ERR_MSG,
    style: style,
    children: _crMsgErr(msg)
  }) : null;
};
var _default = exports.default = MsgRenderErr;
//# sourceMappingURL=MsgRenderErr.js.map