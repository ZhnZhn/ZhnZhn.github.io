"use strict";

exports.__esModule = true;
exports.default = void 0;

var _jsxRuntime = require("react/jsx-runtime");

const S_RENDER_ERR = {
  color: '#f44336',
  fontWeight: 'bold'
};

const MsgRenderErr = ({
  isShow,
  style,
  msg = ''
}) => isShow ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
  style: { ...S_RENDER_ERR,
    ...style
  },
  children: ("Error occured during rendering " + msg).trim() + '.'
}) : null;

var _default = MsgRenderErr;
exports.default = _default;
//# sourceMappingURL=MsgRenderErr.js.map