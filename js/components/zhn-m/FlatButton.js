"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _useThrottleClick = _interopRequireDefault(require("../hooks/useThrottleClick"));
var _useHotKey = _interopRequireDefault(require("../hotkeys/useHotKey"));
var _BtCaption = require("./BtCaption");
var _jsxRuntime = require("react/jsx-runtime");
const CL_ARROW = "arrow-down",
  TOKEN_BT_FLAT = 'bt-flat',
  CL_BT_FLAT = (0, _styleFn.crBold16Cn)(TOKEN_BT_FLAT),
  CL_BT_FLAT_CAPTION = `${TOKEN_BT_FLAT}__caption`;
const _crTitle = (title, hotKey) => hotKey ? `${title || ''} [${hotKey.toLowerCase()}]` : title;
const FlatButton = props => {
  const _hClick = (0, _useThrottleClick.default)(props.timeout ?? 3000, props.onClick),
    [_appHotKey, _refBt] = (0, _useHotKey.default)(props.hotKey, _hClick, props.refBt),
    _hotKey = _appHotKey || props.hotKey2;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("button", {
    ref: _refBt,
    type: "button",
    "aria-label": props.ariaLabel,
    title: _crTitle(props.title, _hotKey),
    className: (0, _styleFn.crCn)(CL_BT_FLAT, props.className),
    style: props.style,
    onClick: _hClick,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_uiApi.IfTrue, {
      v: props.caption,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_BtCaption.BtCaption, {
        className: CL_BT_FLAT_CAPTION,
        caption: props.caption,
        hotKey: _hotKey,
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_uiApi.IfTrue, {
          v: props.isArrow,
          children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
            className: CL_ARROW
          })
        })
      })
    }), props.children]
  });
};
var _default = exports.default = FlatButton;
//# sourceMappingURL=FlatButton.js.map