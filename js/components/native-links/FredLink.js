"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Link = _interopRequireDefault(require("./Link"));

var ROOT = 'https://fred.stlouisfed.org/';
var C = {
  URL_SEARCH: ROOT + "search?st=",
  URL_GRAPH: ROOT + "series/"
};
var S = {
  DELIMETER: {
    display: 'inline-block',
    width: '32px'
  }
};

var Delimeter = function Delimeter() {
  return /*#__PURE__*/_react["default"].createElement("span", {
    style: S.DELIMETER
  }, "\xA0");
};

var FredLink = function FredLink(_ref) {
  var _ref$item = _ref.item,
      item = _ref$item === void 0 ? {} : _ref$item;
  var _item$id = item.id,
      id = _item$id === void 0 ? '' : _item$id,
      article = item.article;
  return /*#__PURE__*/_react["default"].createElement(_react.Fragment, null, /*#__PURE__*/_react["default"].createElement(_Link["default"], {
    caption: "FRED Search",
    href: C.URL_SEARCH + id
  }), /*#__PURE__*/_react["default"].createElement(Delimeter, null), /*#__PURE__*/_react["default"].createElement(_Link["default"], {
    caption: "FRED Graph",
    href: C.URL_GRAPH + id
  }), /*#__PURE__*/_react["default"].createElement(Delimeter, null), article && /*#__PURE__*/_react["default"].createElement(_Link["default"], {
    caption: "FRED Article",
    href: article
  }));
};

var _default = FredLink;
exports["default"] = _default;
//# sourceMappingURL=FredLink.js.map