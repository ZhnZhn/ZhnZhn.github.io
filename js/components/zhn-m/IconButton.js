"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _useHotKey = _interopRequireDefault(require("../hotkeys/useHotKey"));
var _buttonFn = require("./buttonFn");
var _jsxRuntime = require("react/jsx-runtime");
const CL_BT_FLAT = (0, _styleFn.crBold16Cn)("bt-flat"),
  S_ICON_BT = {
    width: 40
  };
const IconButton = props => {
  const [_hotKey] = (0, _useHotKey.default)(props.hotKey, props.onClick);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    type: "button",
    "aria-label": props.ariaLabel,
    title: (0, _buttonFn.crButtonTitle)(props.title, _hotKey),
    className: (0, _styleFn.crCn)(CL_BT_FLAT, props.className),
    style: {
      ...S_ICON_BT,
      ...props.style
    },
    onClick: props.onClick,
    children: props.children
  });
};
var _default = exports.default = IconButton;
//# sourceMappingURL=IconButton.js.map