"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _Link = _interopRequireDefault(require("./Link"));

var URL = 'https://www.cryptocompare.com/coins';

var _isStrNotEmpty = function _isStrNotEmpty(str) {
  return typeof str === 'string' && str;
};

var _crHref = function _crHref(item) {
  return _isStrNotEmpty(item) ? URL + "/" + item.toLowerCase() + "/overview" : URL;
};

var CrcLink = function CrcLink(_ref) {
  var item = _ref.item,
      style = _ref.style;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link["default"], {
    style: style,
    caption: "CryptoCompare Overview (" + item + ")",
    href: _crHref(item)
  });
};

var _default = CrcLink;
exports["default"] = _default;
//# sourceMappingURL=CrcLink.js.map