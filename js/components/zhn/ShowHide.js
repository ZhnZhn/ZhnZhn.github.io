"use strict";

exports.__esModule = true;
exports.default = void 0;
var _a11yFn = require("../a11yFn");
var _styleFn = require("../styleFn");
var _jsxRuntime = require("react/jsx-runtime");
const ShowHide = props => {
  const [_cn, _style] = (0, _styleFn.crShowHide)(props.isShow, props.className, props.withoutAnimation, props.animationClass);

  /*eslint-disable jsx-a11y/no-static-element-interactions*/
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    ...(0, _a11yFn.crPresentationRole)(props.isShow),
    className: _cn,
    style: {
      ...props.style,
      ..._style
    },
    onKeyDown: props.onKeyDown,
    children: props.children
  });
  /*eslint-enable jsx-a11y/no-static-element-interactions*/
};
var _default = exports.default = ShowHide;
//# sourceMappingURL=ShowHide.js.map