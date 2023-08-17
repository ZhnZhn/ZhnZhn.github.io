"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _useTheme = _interopRequireDefault(require("../hooks/useTheme"));
var _Button = _interopRequireDefault(require("./Button"));
var _jsxRuntime = require("react/jsx-runtime");
const TH_ID = 'ELEMENT';
const CL_BT_TAB = 'not-selected bt-tab',
  CL_BT_TAB__SHOW = CL_BT_TAB + " bt-tab--show",
  CL_ARROW_DOWN = 'arrow-down';
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
  const TS = (0, _useTheme.default)(TH_ID);
  return is ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Button.default, {
    className: (0, _styleFn.crCn)(isShow ? CL_BT_TAB__SHOW : CL_BT_TAB, className),
    style: {
      ...style,
      ...TS.BG
    },
    onClick: onClick,
    children: [caption, isMenu && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: CL_ARROW_DOWN
    })]
  }) : null;
};
var _default = ButtonTab;
exports.default = _default;
//# sourceMappingURL=ButtonTab.js.map