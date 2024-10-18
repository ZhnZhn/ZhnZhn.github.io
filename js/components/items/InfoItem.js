"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.InfoItem = void 0;
var _uiApi = require("../uiApi");
var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));
var _OpenClose = _interopRequireDefault(require("../zhn/OpenClose"));
var _ItemList = _interopRequireDefault(require("../zhn/ItemList"));
var _ShowHide = _interopRequireDefault(require("../zhn/ShowHide"));
var _ItemStack = _interopRequireDefault(require("../zhn/ItemStack"));
var _Link = _interopRequireDefault(require("../native-links/Link"));
var _ItemHeader = _interopRequireDefault(require("./ItemHeader"));
var _FlexTokens = _interopRequireDefault(require("./FlexTokens"));
var _jsxRuntime = require("react/jsx-runtime");
const _isArr = Array.isArray,
  S_ROOT = {
    marginBottom: 10
  },
  S_HEADER = {
    height: 33
  },
  S_CAPTION = {
    width: 'auto'
  },
  S_INFO = {
    padding: '8px 8px 0 8px'
  },
  S_DESCR = {
    padding: '0 4px',
    lineHeight: 1.8
  },
  DF_DESCR_CAPTION = "Decription";
const _crLinkItem = _ref => {
  let {
    href,
    caption
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link.default, {
    caption: (0, _uiApi.joinBy)(": ", caption, href),
    href: href
  });
};
const Descr = _ref2 => {
  let {
    style,
    caption = DF_DESCR_CAPTION,
    descr,
    links
  } = _ref2;
  return descr ? /*#__PURE__*/(0, _jsxRuntime.jsxs)(_OpenClose.default, {
    caption: caption,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        ...S_DESCR,
        ...style
      },
      children: descr
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemList.default, {
      items: links,
      crItem: _crLinkItem
    })]
  }) : null;
};
const _crStackItem = (item, index) => {
  const _key = item.caption || index;
  return _isArr(item.tokens) ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlexTokens.default, {
    ...item
  }, _key) : /*#__PURE__*/(0, _jsxRuntime.jsx)(Descr, {
    ...item
  }, _key);
};
const InfoItem = _ref3 => {
  let {
    config,
    onCloseItem
  } = _ref3;
  const [isOpen, toggleIsOpen] = (0, _useToggle.default)(true),
    {
      caption,
      items
    } = config || {};
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S_ROOT,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemHeader.default, {
      style: S_HEADER,
      captionStyle: S_CAPTION,
      isOpen: isOpen,
      caption: caption,
      onClick: toggleIsOpen,
      onClose: onCloseItem
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_ShowHide.default, {
      style: S_INFO,
      isShow: isOpen,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
        items: items,
        crItem: _crStackItem
      })
    })]
  });
};
exports.InfoItem = InfoItem;
//# sourceMappingURL=InfoItem.js.map