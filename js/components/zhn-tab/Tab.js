"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _crCn = _interopRequireDefault(require("../zhn-utils/crCn"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_TAB = 'tab',
  CL_TAB_SELECTED = CL_TAB + "--selected";
const Tab = _ref => {
  let {
    id,
    title,
    isSelected,
    onClick
  } = _ref;
  const _cn = (0, _crCn.default)(CL_TAB, [isSelected, CL_TAB_SELECTED]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    type: "button",
    className: _cn,
    id: "tab-" + id,
    role: "tab",
    "aria-selected": isSelected,
    "aria-controls": "tabpanel-" + id,
    onClick: onClick,
    children: title
  });
};
var _default = Tab;
exports.default = _default;
//# sourceMappingURL=Tab.js.map