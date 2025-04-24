"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _useThrottleClick = _interopRequireDefault(require("../hooks/useThrottleClick"));
var _useHotKey = _interopRequireDefault(require("../hotkeys/useHotKey"));
var _BtCaption = _interopRequireDefault(require("./BtCaption"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_ARROW = "arrow-down",
  TOKEN_BT_FLAT = 'bt-flat',
  CL_BT_FLAT = (0, _styleFn.crBold16Cn)(TOKEN_BT_FLAT),
  CL_BT_FLAT_CAPTION = `${TOKEN_BT_FLAT}__caption`;
const _crTitle = (title, hotKey) => hotKey ? `${title || ''} [${hotKey.toLowerCase()}]` : title;
const FlatButton = _ref => {
  let {
    refBt,
    isArrow,
    timeout = 3000,
    className,
    style,
    title,
    caption,
    hotKey,
    children,
    onClick
  } = _ref;
  const _hClick = (0, _useThrottleClick.default)(timeout, onClick),
    [_hotKey, _refBt] = (0, _useHotKey.default)(hotKey, _hClick, refBt);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
    type: "button",
    ref: _refBt,
    className: (0, _styleFn.crCn)(CL_BT_FLAT, className),
    style: style,
    title: _crTitle(title, _hotKey),
    onClick: _hClick,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_BtCaption.default, {
      className: CL_BT_FLAT_CAPTION,
      caption: caption,
      hotKey: _hotKey,
      children: isArrow && /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        className: CL_ARROW
      })
    }), children]
  });
};
var _default = exports.default = FlatButton;
//# sourceMappingURL=FlatButton.js.map