"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _Link = _interopRequireDefault(require("./Link"));

var EURONEXT_BASE = 'https://www.euronext.com/en/products/equities/',
    CAPTION = 'Euronext Link';

var EuronextLink = function EuronextLink(_ref) {
  var _ref$item = _ref.item,
      item = _ref$item === void 0 ? {} : _ref$item,
      _ref$caption = _ref.caption,
      caption = _ref$caption === void 0 ? CAPTION : _ref$caption;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link["default"], {
    caption: caption + " " + item.caption,
    href: "" + EURONEXT_BASE + item.isin + "-" + item.market
  });
};

var _default = EuronextLink;
exports["default"] = _default;
//# sourceMappingURL=EuronextLink.js.map