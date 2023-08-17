"use strict";

exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _jsxRuntime = require("react/jsx-runtime");
const CL_TAB = 'tab',
  CL_TAB_SELECTED = CL_TAB + "--selected";
const Tab = _ref => {
  let {
    id,
    title,
    isSelected,
    onClick,
    onKeyDown
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    type: "button",
    className: (0, _styleFn.crCn)(CL_TAB, [isSelected, CL_TAB_SELECTED]),
    id: "tab-" + id,
    role: "tab",
    tabIndex: isSelected ? '0' : '-1',
    "aria-selected": isSelected,
    "aria-controls": "tabpanel-" + id,
    onClick: onClick,
    onKeyDown: onKeyDown,
    children: title
  });
};
var _default = Tab;
exports.default = _default;
//# sourceMappingURL=Tab.js.map