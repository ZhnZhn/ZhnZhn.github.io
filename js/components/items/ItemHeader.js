"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _Button = _interopRequireDefault(require("../zhn/Button"));
var _BtSvgX = require("../zhn/BtSvgX");
var _Item = require("./Item.Style");
var _jsxRuntime = require("react/jsx-runtime");
const CL_ITEM_HEADER = (0, _styleFn.crItemCaptionCn)(),
  S_ROOT = {
    position: 'relative',
    height: 'auto',
    width: '100%',
    padding: '6px 42px 6px 10px'
  },
  S_CAPTION = {
    width: '75%',
    padding: '4px 2px 2px 0'
  },
  MAX_LENGTH = 45,
  _crTitle = (title, caption) => title || caption.length > MAX_LENGTH ? caption : void 0;
const ItemHeader = _ref => {
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
  const _title = _crTitle(title, caption);
  /*
  , _captionStyle = isOpen
      ? S_HEADER_CAPTION_OPEN
      : void 0;
  */
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: CL_ITEM_HEADER,
    style: {
      ...S_ROOT,
      ...style
    },
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Button.default, {
      className: _Item.CL_HEADER_CAPTION,
      style: {
        ...S_CAPTION,
        ...captionStyle
        //..._captionStyle
      },
      title: _title,
      onClick: onClick,
      children: caption
    }), children, /*#__PURE__*/(0, _jsxRuntime.jsx)(_BtSvgX.BtSvgClose, {
      style: _Item.S_BT_SVG_CLOSE,
      onClick: onClose
    })]
  });
};
var _default = exports.default = ItemHeader;
//# sourceMappingURL=ItemHeader.js.map