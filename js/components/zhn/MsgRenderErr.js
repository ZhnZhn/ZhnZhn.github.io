"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

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
  return isShow ? /*#__PURE__*/_react["default"].createElement("div", {
    style: (0, _extends2["default"])({}, S.RENDER_ERR, style)
  }, ("Error occured during rendering " + msg).trim() + '.') : null;
};

var _default = MsgRenderErr;
exports["default"] = _default;
//# sourceMappingURL=MsgRenderErr.js.map