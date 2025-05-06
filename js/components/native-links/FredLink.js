"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Link = _interopRequireDefault(require("../zhn/Link"));
var _jsxRuntime = require("react/jsx-runtime");
const ROOT = 'https://fred.stlouisfed.org/';
const URL_SEARCH = `${ROOT}search?st=`;
const URL_GRAPH = `${ROOT}series/`;
const S_DELIMETER = {
  display: 'inline-block',
  width: 32
};
const Delimeter = () => /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
  style: S_DELIMETER,
  children: "\xA0"
});
const FredLink = _ref => {
  let {
    item = {}
  } = _ref;
  const {
    id = '',
    article
  } = item;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)(_jsxRuntime.Fragment, {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Link.default, {
      href: URL_SEARCH + id,
      children: "FRED Search"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Delimeter, {}), /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link.default, {
      href: URL_GRAPH + id,
      children: "FRED Graph"
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)(Delimeter, {}), article && /*#__PURE__*/(0, _jsxRuntime.jsx)(_Link.default, {
      href: article,
      children: "FRED Article"
    })]
  });
};
var _default = exports.default = FredLink;
//# sourceMappingURL=FredLink.js.map