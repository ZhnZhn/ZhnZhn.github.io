"use strict";

exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _jsxRuntime = require("react/jsx-runtime");
const ShowHide = _ref => {
  let {
    isShow,
    className,
    style,
    withoutAnimation,
    animationClass,
    onKeyDown,
    children
  } = _ref;
  const [_cn, _style] = (0, _styleFn.crShowHide)(isShow, className, withoutAnimation, animationClass);

  /*eslint-disable jsx-a11y/no-static-element-interactions*/
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    "aria-expanded": isShow,
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
var _default = exports.default = ShowHide;
//# sourceMappingURL=ShowHide.js.map