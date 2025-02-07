"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.RowOpenClose = void 0;
var _OpenClose = _interopRequireDefault(require("../zhn/OpenClose"));
var _styleFn = require("../styleFn");
var _Row = require("./Row.Style");
var _jsxRuntime = require("react/jsx-runtime");
const RowOpenClose = _ref => {
  let {
    caption,
    CompAfter,
    children
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_OpenClose.default, {
    caption: caption,
    className: _styleFn.CL_OPEN_CLOSE_BLACK,
    style: _Row.S_OPEN_CLOSE,
    ocStyle: _Row.S_OC_STYLE,
    CompAfter: CompAfter,
    children: children
  });
};
exports.RowOpenClose = RowOpenClose;
//# sourceMappingURL=RowOpenClose.js.map