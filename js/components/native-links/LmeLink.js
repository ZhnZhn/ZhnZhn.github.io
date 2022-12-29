"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Link = _interopRequireDefault(require("./Link"));
var _jsxRuntime = require("react/jsx-runtime");
const BASE_URL = 'https://www.lme.com/metals/non-ferrous/';
const LME = 'London Metal Exchange: ';
const LmeLink = _ref => {
  let {
    item = {}
  } = _ref;
  const {
      caption = ''
    } = item,
    _path = String(caption).toLowerCase().replace(' ', '-');
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link.default, {
    caption: LME + caption,
    href: BASE_URL + _path
  });
};
var _default = LmeLink;
exports.default = _default;
//# sourceMappingURL=LmeLink.js.map