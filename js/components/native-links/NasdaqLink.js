"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Link = _interopRequireDefault(require("./Link"));
var _jsxRuntime = require("react/jsx-runtime");
const NASDAQ_BASE = 'https://www.nasdaq.com/symbol/',
  CAPTION = 'NASDAQ Link';
const _isObj = v => v && typeof v === 'object';
const _isStr = v => typeof v === 'string';
const NasdaqLink = _ref => {
  let {
    item = {},
    caption = CAPTION,
    style
  } = _ref;
  const {
      text = '',
      value
    } = _isObj(item) ? item : {
      value: item
    },
    _ticket = _isStr(value) ? value.trim() : text.split('-')[0].trim();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link.default, {
    style: style,
    href: "" + NASDAQ_BASE + _ticket,
    caption: caption + " " + _ticket
  });
};
var _default = NasdaqLink;
exports.default = _default;
//# sourceMappingURL=NasdaqLink.js.map