"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;

var _Link = _interopRequireDefault(require("./Link"));

var _jsxRuntime = require("react/jsx-runtime");

const ROOT_URI = 'https://www.quandl.com/data/',
      DF_CAPTION = 'Quandl Data Link',
      S_LINK = {
  color: '#e05927'
};

const QuandlLink = ({
  linkId,
  caption = DF_CAPTION
}) => {
  if (!linkId) return null;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link.default, {
    style: S_LINK,
    href: "" + ROOT_URI + linkId,
    caption: caption + " " + linkId
  });
};

var _default = QuandlLink;
exports.default = _default;
//# sourceMappingURL=QuandlLink.js.map