"use strict";

exports.__esModule = true;
exports.default = void 0;
var _a11yFn = require("../a11yFn");
var _styleFn = require("../styleFn");
var _jsxRuntime = require("react/jsx-runtime");
const CL_BROWSER = (0, _styleFn.crBsContainerCn)('browser-container');
const Browser = _ref => {
  let {
    isShow,
    style,
    onKeyDown,
    children
  } = _ref;
  const [_cn, _style] = (0, _styleFn.crShowHide)(isShow, CL_BROWSER);

  /*eslint-disable jsx-a11y/no-static-element-interactions*/
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ...(0, _a11yFn.crPresentationRole)(isShow),
    className: _cn,
    style: {
      ...style,
      ..._style
    },
    onKeyDown: onKeyDown,
    children: children
  });
  /*eslint-enable jsx-a11y/no-static-element-interactions*/
};
var _default = exports.default = Browser;
//# sourceMappingURL=Browser.js.map