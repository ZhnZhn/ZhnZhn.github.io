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
  CL_BT_FLAT_CAPTION = TOKEN_BT_FLAT + "__caption",
  S_PRIMARY_COLOR = {
    color: '#607d8b'
  };
const _crTitle = (title, hotKey) => hotKey ? title + " [" + hotKey.toLowerCase() + "]" : title;
const FlatButton = _ref => {
  let {
    refBt,
    isArrow,
    timeout = 3000,
    className,
    style,
    isPrimary,
    title = '',
    caption,
    hotKey,
    children,
    onClick
  } = _ref;
  const _hClick = (0, _useThrottleClick.default)(timeout, onClick),
    _className = (0, _styleFn.crCn)(CL_BT_FLAT, className),
    _style = (0, _styleFn.crStyle2)(style, isPrimary && S_PRIMARY_COLOR),
    [_hotKey, _refBt] = (0, _useHotKey.default)(hotKey, _hClick, refBt),
    _title = _crTitle(title, _hotKey);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
    type: "button",
    ref: _refBt,
    className: _className,
    style: _style,
    title: _title,
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