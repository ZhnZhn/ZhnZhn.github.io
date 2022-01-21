"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _useToggle = _interopRequireDefault(require("../hooks/useToggle"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _ItemHeader = _interopRequireDefault(require("./ItemHeader"));

var _jsxRuntime = require("react/jsx-runtime");

const {
  toLink,
  ShowHide,
  ItemStack,
  SvgClose
} = _Comp.default;
const CL = 'twit',
      S_TW_LIST = {
  marginBottom: 8
},
      S_SHOW_HIDE = {
  padding: '8px 10px 0 0'
},
      S_PL_16 = {
  paddingLeft: 16
},
      S_ROW_TITLE = {
  position: 'relative',
  color: 'gray',
  paddingLeft: 16,
  lineHeight: 1.8
},
      S_BT_CLOSE = {
  position: 'absolute',
  right: 0
},
      S_ROW = {
  color: 'gray',
  paddingLeft: 16
};

const Twit = _ref => {
  let {
    item
  } = _ref;
  const [isShow, toggleIsShow] = (0, _useToggle.default)(true);

  if (!isShow) {
    return null;
  }

  const {
    user,
    date,
    link,
    text,
    retweet,
    like
  } = item,
        _link = toLink(link);

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: CL,
    href: _link,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S_ROW_TITLE,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        children: user + " "
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        children: date
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(SvgClose, {
        style: S_BT_CLOSE,
        onClose: toggleIsShow
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
      href: _link,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: S_PL_16,
        children: text
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S_ROW,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        children: "Retweets " + retweet + " "
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        children: "Likes " + like
      })]
    })]
  });
};

const _crTwItem = item => /*#__PURE__*/(0, _jsxRuntime.jsx)(Twit, {
  item: item
}, item.id);

const TwList = _ref2 => {
  let {
    config,
    onCloseItem
  } = _ref2;
  const {
    title,
    items
  } = config,
        [isOpen, toggleIsOpen] = (0, _useToggle.default)(true);
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S_TW_LIST,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemHeader.default, {
      isOpen: isOpen,
      caption: title,
      onClick: toggleIsOpen,
      onClose: onCloseItem
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(ShowHide, {
      isShow: isOpen,
      style: S_SHOW_HIDE,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(ItemStack, {
        items: items,
        crItem: _crTwItem
      })
    })]
  });
};

var _default = TwList;
exports.default = _default;
//# sourceMappingURL=TwList.js.map