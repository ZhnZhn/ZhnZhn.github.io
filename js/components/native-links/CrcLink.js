"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Link = _interopRequireDefault(require("./Link"));
var _jsxRuntime = require("react/jsx-runtime");
const URL = 'https://www.cryptocompare.com/coins';
const _isStrNotEmpty = str => typeof str === 'string' && str;
const _crHref = item => _isStrNotEmpty(item) ? URL + "/" + item.toLowerCase() + "/overview" : URL;
const CrcLink = _ref => {
  let {
    item,
    style
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link.default, {
    style: style,
    caption: "CryptoCompare Overview (" + item + ")",
    href: _crHref(item)
  });
};
var _default = CrcLink;
exports.default = _default;
//# sourceMappingURL=CrcLink.js.map