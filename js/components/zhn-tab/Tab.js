"use strict";

exports.__esModule = true;
exports.default = void 0;
var _jsxRuntime = require("react/jsx-runtime");
const Tab = _ref => {
  let {
    className,
    tabId,
    tabPanelId,
    title,
    isSelected,
    onClick,
    onKeyDown
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    type: "button",
    role: "tab",
    className: className,
    id: tabId,
    tabIndex: isSelected ? '0' : '-1',
    "aria-selected": isSelected,
    "aria-controls": tabPanelId,
    onClick: onClick,
    onKeyDown: onKeyDown,
    children: title
  });
};
var _default = Tab;
exports.default = _default;
//# sourceMappingURL=Tab.js.map