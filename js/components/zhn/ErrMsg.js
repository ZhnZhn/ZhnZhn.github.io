"use strict";

exports.__esModule = true;
exports.default = void 0;

var _Input = require("./Input.Style");

var _jsxRuntime = require("react/jsx-runtime");

const ErrMsg = _ref => {
  let {
    msg
  } = _ref;
  return msg ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: _Input.S_ERR_MSG,
    children: msg
  }) : null;
};

var _default = ErrMsg;
exports.default = _default;
//# sourceMappingURL=ErrMsg.js.map