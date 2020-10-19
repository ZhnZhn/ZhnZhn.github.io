"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _useToggle3 = _interopRequireDefault(require("../hooks/useToggle"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _ItemHeader = _interopRequireDefault(require("./ItemHeader"));

var ShowHide = _Comp["default"].ShowHide,
    ItemList = _Comp["default"].ItemList,
    SvgClose = _Comp["default"].SvgClose;
var CL = 'twit';
var S = {
  ROOT: {
    marginBottom: 8
  },
  SHOW_HIDE: {
    paddingTop: 8,
    paddingRight: 10
  },
  PL_16: {
    paddingLeft: 16
  },
  ROW_TITLE: {
    position: 'relative',
    color: 'gray',
    lineHeight: 1.8,
    paddingLeft: 16
  },
  BT_CLOSE: {
    position: 'absolute',
    right: 0
  },
  ROW: {
    color: 'gray',
    paddingLeft: 16
  }
};

var Twit = function Twit(_ref) {
  var item = _ref.item;

  var _useToggle = (0, _useToggle3["default"])(true),
      isShow = _useToggle[0],
      toggleIsShow = _useToggle[1];

  if (!isShow) {
    return null;
  }

  var user = item.user,
      date = item.date,
      link = item.link,
      text = item.text,
      retweet = item.retweet,
      like = item.like;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: CL,
    href: link,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S.ROW_TITLE,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        children: user + " "
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        children: date
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)(SvgClose, {
        style: S.BT_CLOSE,
        onClose: toggleIsShow
      })]
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("a", {
      href: link,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: S.PL_16,
        children: text
      })
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
      style: S.ROW,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        children: "Retweets " + retweet + " "
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
        children: "Likes " + like
      })]
    })]
  });
};

var TwList = function TwList(_ref2) {
  var config = _ref2.config,
      onCloseItem = _ref2.onCloseItem;

  var title = config.title,
      items = config.items,
      _useToggle2 = (0, _useToggle3["default"])(true),
      isOpen = _useToggle2[0],
      toggleIsOpen = _useToggle2[1];

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S.ROOT,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemHeader["default"], {
      isOpen: isOpen,
      caption: title,
      onClick: toggleIsOpen,
      onClose: onCloseItem
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(ShowHide, {
      isShow: isOpen,
      style: S.SHOW_HIDE,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)(ItemList, {
        items: items,
        Item: Twit
      })
    })]
  });
};

var _default = TwList;
exports["default"] = _default;
//# sourceMappingURL=TwList.js.map