"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Link = _interopRequireDefault(require("./Link"));

var NASDAQ_BASE = 'https://www.nasdaq.com/symbol/',
    CAPTION = 'NASDAQ Link';

var NasdaqLink = function NasdaqLink(_ref) {
  var _ref$item = _ref.item,
      item = _ref$item === void 0 ? {} : _ref$item,
      _ref$caption = _ref.caption,
      caption = _ref$caption === void 0 ? CAPTION : _ref$caption,
      style = _ref.style;

  var _ref2 = typeof item === 'object' ? item : {
    value: item
  },
      _ref2$text = _ref2.text,
      text = _ref2$text === void 0 ? '' : _ref2$text,
      value = _ref2.value,
      _ticket = value ? value.trim() : text.split('-')[0].trim();

  return /*#__PURE__*/_react["default"].createElement(_Link["default"], {
    style: style,
    href: "" + NASDAQ_BASE + _ticket,
    caption: caption + " " + _ticket
  });
};

var _default = NasdaqLink;
exports["default"] = _default;
//# sourceMappingURL=NasdaqLink.js.map