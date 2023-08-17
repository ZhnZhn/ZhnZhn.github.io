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
    children
  } = _ref;
  const [_cn, _style] = (0, _styleFn.crShowHide)(isShow, className, withoutAnimation, animationClass);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    "aria-expanded": isShow,
    className: _cn,
    style: {
      ...style,
      ..._style
    },
    children: children
  });
};
var _default = ShowHide;
exports.default = _default;
//# sourceMappingURL=ShowHide.js.map