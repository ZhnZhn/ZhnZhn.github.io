"use strict";

exports.__esModule = true;
exports.default = void 0;

var _Style = require("./Style");

var _jsxRuntime = require("react/jsx-runtime");

const ErrMsg = _ref => {
  let {
    errMsg
  } = _ref;
  return errMsg ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: _Style.S_MSG_ERR,
    children: errMsg
  }) : null;
};

var _default = ErrMsg;
exports.default = _default;
//# sourceMappingURL=ErrMsg.js.map