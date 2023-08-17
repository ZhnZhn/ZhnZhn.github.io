"use strict";

exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _jsxRuntime = require("react/jsx-runtime");
const CL_BT_C2 = 'bt-circle bt-c2 not-selected';
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
    className: (0, _styleFn.crCn)(CL_BT_C2, className),
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