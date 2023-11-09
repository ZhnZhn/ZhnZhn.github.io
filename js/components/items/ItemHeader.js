"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _Button = _interopRequireDefault(require("../zhn/Button"));
var _BtSvgX = require("../zhn/BtSvgX");
var _jsxRuntime = require("react/jsx-runtime");
const CL_ITEM_HEADER = (0, _styleFn.crElementCn)(),
  CL_CAPTION = "not-selected text-clip bt-left bt",
  S_ROOT = {
    position: 'relative',
    height: 'auto',
    width: '100%',
    padding: '6px 42px 6px 10px',
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2
  },
  S_CAPTION = {
    width: '75%',
    padding: '4px 2px 2px 0'
  },
  S_OPEN = {
    color: '#a487d4'
  },
  S_CLOSE = {
    color: 'gray'
  },
  S_SVG_CLOSE = {
    top: 4
  },
  MAX_LENGTH = 45,
  _crTitle = (title, caption) => title || caption.length > MAX_LENGTH ? caption : void 0;
function ItemHeader(_ref) {
  let {
    isOpen,
    style,
    captionStyle,
    caption = '',
    title,
    children,
    onClick,
    onClose
  } = _ref;
  const _title = _crTitle(title, caption),
    _captionStyle = isOpen ? S_OPEN : S_CLOSE;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: CL_ITEM_HEADER,
    style: {
      ...S_ROOT,
      ...style
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
      className: CL_CAPTION,
      style: {
        ...S_CAPTION,
        ...captionStyle,
        ..._captionStyle
      },
      title: _title,
      onClick: onClick,
      children: caption
    }), children, /*#__PURE__*/(0, _jsxRuntime.jsx)(_BtSvgX.BtSvgClose, {
      style: S_SVG_CLOSE,
      onClick: onClose
    })]
  });
}
var _default = exports.default = ItemHeader;
//# sourceMappingURL=ItemHeader.js.map