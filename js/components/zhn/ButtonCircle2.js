"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crCn = _interopRequireDefault(require("../zhn-utils/crCn"));
var _jsxRuntime = require("react/jsx-runtime");
const CL = 'bt-circle bt-c2 not-selected';
const ButtonCircle2 = _ref => {
  let {
    tabIndex,
    className,
    style,
    dataLoader,
    caption = '',
    onClick
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    type: "button",
    tabIndex: tabIndex,
    className: (0, _crCn.default)(CL, className),
    style: style,
    "data-loader": dataLoader,
    onClick: onClick,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      children: caption
    })
  });
};
var _default = ButtonCircle2;
exports.default = _default;
//# sourceMappingURL=ButtonCircle2.js.map