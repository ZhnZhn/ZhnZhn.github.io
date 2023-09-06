"use strict";

exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _jsxRuntime = require("react/jsx-runtime");
const CL_BROWSER = (0, _styleFn.crBsContainerCl)('browser-container'),
  CL_SHOW = 'show-popup',
  S_BLOCK = {
    display: 'block'
  },
  S_NONE = {
    display: 'none'
  };
const Browser = _ref => {
  let {
    isShow,
    style,
    children
  } = _ref;
  const [_cn, _style] = isShow ? [CL_BROWSER + " " + CL_SHOW, S_BLOCK] : [CL_BROWSER, S_NONE];
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: _cn,
    style: {
      ...style,
      ..._style
    },
    children: children
  });
};
var _default = Browser;
exports.default = _default;
//# sourceMappingURL=Browser.js.map