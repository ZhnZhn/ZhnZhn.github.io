"use strict";

exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _tabPaneFn = require("./tabPaneFn");
var _jsxRuntime = require("react/jsx-runtime");
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
    className: (0, _styleFn.crCn)(_tabPaneFn.CL_TAB, [isSelected, _tabPaneFn.CL_TAB_SELECTED]),
    id: (0, _tabPaneFn.crTabId)(id),
    role: "tab",
    tabIndex: isSelected ? '0' : '-1',
    "aria-selected": isSelected,
    "aria-controls": (0, _tabPaneFn.crTabPanelId)(id),
    onClick: onClick,
    onKeyDown: onKeyDown,
    children: title
  });
};
var _default = Tab;
exports.default = _default;
//# sourceMappingURL=Tab.js.map