"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _jsxRuntime = require("react/jsx-runtime.js");

var _useToggle2 = _interopRequireDefault(require("../hooks/useToggle"));

var _Comp = _interopRequireDefault(require("../Comp"));

var _Link = _interopRequireDefault(require("../native-links/Link"));

var _ItemHeader = _interopRequireDefault(require("./ItemHeader"));

var _FlexTokens = _interopRequireDefault(require("./FlexTokens"));

var _isArr = Array.isArray;
var S = {
  ROOT: {
    marginBottom: 10
  },
  HEADER: {
    height: 33
  },
  CAPTION: {
    width: 'auto'
  },
  INFO: {
    paddingTop: 8,
    paddingLeft: 8,
    paddingRight: 8
  },
  DESCR: {
    paddingLeft: 4,
    paddingRight: 4,
    lineHeight: 1.8
  },
  LINKS: {
    listStyle: 'none'
  }
};

var LinkList = function LinkList(_ref) {
  var links = _ref.links;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("ul", {
    style: S.LINKS,
    children: (links || []).map(function (_ref2, index) {
      var href = _ref2.href,
          caption = _ref2.caption;
      return /*#__PURE__*/(0, _jsxRuntime.jsx)("li", {
        children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link["default"], {
          caption: caption + ": " + href,
          href: href
        })
      }, index);
    })
  });
};

var Descr = function Descr(_ref3) {
  var style = _ref3.style,
      _ref3$caption = _ref3.caption,
      caption = _ref3$caption === void 0 ? "Decription" : _ref3$caption,
      descr = _ref3.descr,
      links = _ref3.links;
  if (!descr) return null;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Comp["default"].OpenClose, {
    caption: caption,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: (0, _extends2["default"])({}, S.DESCR, style),
      children: descr
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(LinkList, {
      links: links
    })]
  });
};

var InfoItem = function InfoItem(_ref4) {
  var _ref4$config = _ref4.config,
      config = _ref4$config === void 0 ? {} : _ref4$config,
      onCloseItem = _ref4.onCloseItem;
  var caption = config.caption,
      items = config.items;

  var _useToggle = (0, _useToggle2["default"])(true),
      isOpen = _useToggle[0],
      toggleIsOpen = _useToggle[1];

  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    style: S.ROOT,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemHeader["default"], {
      isOpen: isOpen,
      rootStyle: S.HEADER,
      captionStyle: S.CAPTION,
      caption: caption,
      onClick: toggleIsOpen,
      onClose: onCloseItem
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Comp["default"].ShowHide, {
      isShow: isOpen,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
        style: S.INFO,
        children: items.map(function (item, index) {
          var _key = item.caption || index;

          return _isArr(item.tokens) ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_FlexTokens["default"], (0, _extends2["default"])({}, item), _key) : /*#__PURE__*/(0, _jsxRuntime.jsx)(Descr, (0, _extends2["default"])({}, item), _key);
        })
      })
    })]
  });
};

var _default = InfoItem;
exports["default"] = _default;
//# sourceMappingURL=InfoItem.js.map