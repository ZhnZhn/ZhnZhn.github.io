"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Link = _interopRequireDefault(require("./Link"));
var _jsxRuntime = require("react/jsx-runtime");
const ROOT_URI = 'https://data.nasdaq.com/data/',
  DF_CAPTION = 'Nasdaq Data Link';
const NdlLink = _ref => {
  let {
    linkId,
    caption = DF_CAPTION
  } = _ref;
  return linkId ? /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link.default, {
    href: "" + ROOT_URI + linkId,
    caption: caption + " " + linkId
  }) : null;
};
var _default = NdlLink;
exports.default = _default;
//# sourceMappingURL=QuandlLink.js.map