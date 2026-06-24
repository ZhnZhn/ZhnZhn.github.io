"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Link = _interopRequireDefault(require("../zhn/Link"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_DESCR_DATASOURCE = "descr-datasource",
  S_DIV = {
    padding: 16
  },
  S_DESCR = {
    marginTop: 16
  };
const AboutView = _ref => {
  let {
    aboutJson
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("div", {
    className: CL_DESCR_DATASOURCE,
    style: S_DIV,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Link.default, {
      href: aboutJson.href,
      children: aboutJson.provider
    }), /*#__PURE__*/(0, _jsxRuntime.jsx)("p", {
      style: S_DESCR,
      children: aboutJson.descr
    })]
  });
};
var _default = exports.default = AboutView;
//# sourceMappingURL=AboutView.js.map