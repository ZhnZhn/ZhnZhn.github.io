"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var S = {
  RENDER_ERR: {
    color: '#f44336',
    fontWeight: 'bold'
  }
};

var MsgRenderErr = function MsgRenderErr(_ref) {
  var isShow = _ref.isShow,
      style = _ref.style,
      _ref$msg = _ref.msg,
      msg = _ref$msg === void 0 ? '' : _ref$msg;
  return isShow ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: (0, _extends2["default"])({}, S.RENDER_ERR, style),
    children: ("Error occured during rendering " + msg).trim() + '.'
  }) : null;
};

var _default = MsgRenderErr;
exports["default"] = _default;
//# sourceMappingURL=MsgRenderErr.js.map