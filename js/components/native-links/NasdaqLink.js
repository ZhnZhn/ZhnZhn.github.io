"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _isTypeFn = require("../../utils/isTypeFn");
var _Link = _interopRequireDefault(require("../zhn/Link"));
var _jsxRuntime = require("react/jsx-runtime");
const NASDAQ_BASE = 'https://www.nasdaq.com/symbol/',
  CAPTION = 'NASDAQ Link';
const NasdaqLink = _ref => {
  let {
    item = {},
    caption = CAPTION,
    style
  } = _ref;
  const {
      text = '',
      value
    } = (0, _isTypeFn.isObj)(item) ? item : {
      value: item
    },
    _ticket = (0, _isTypeFn.isStr)(value) ? value.trim() : text.split('-')[0].trim();
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link.default, {
    style: style,
    href: `${NASDAQ_BASE}${_ticket}`,
    caption: `${caption} ${_ticket}`
  });
};
var _default = exports.default = NasdaqLink;
//# sourceMappingURL=NasdaqLink.js.map