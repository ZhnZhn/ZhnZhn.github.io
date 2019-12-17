"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Link = _interopRequireDefault(require("./Link"));

var URL = 'https://www.cryptocompare.com/coins/';

var CrcLink = function CrcLink(_ref) {
  var item = _ref.item,
      style = _ref.style;
  return _react["default"].createElement(_Link["default"], {
    style: style,
    caption: "CryptoCompare Overview (" + item + ")",
    href: "" + URL + item + "/overview"
  });
};

var _default = CrcLink;
exports["default"] = _default;
//# sourceMappingURL=CrcLink.js.map