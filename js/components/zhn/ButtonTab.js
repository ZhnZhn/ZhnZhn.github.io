"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _Button = _interopRequireDefault(require("./Button"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_BT_TAB = "not-selected bt-tab",
  CL_BT_TAB__SHOW = `${CL_BT_TAB} bt-tab--show`,
  CL_ARROW_DOWN = "arrow-down";
const ButtonTab = _ref => {
  let {
    is = true,
    isShow,
    isMenu,
    className,
    style,
    caption,
    onClick
  } = _ref;
  return is ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Button.default, {
    className: (0, _styleFn.crCn)(isShow ? CL_BT_TAB__SHOW : CL_BT_TAB, className),
    style: style,
    onClick: onClick,
    children: [caption, isMenu && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: CL_ARROW_DOWN
    })]
  }) : null;
};
var _default = exports.default = ButtonTab;
//# sourceMappingURL=ButtonTab.js.map