"use strict";

exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _jsxRuntime = require("react/jsx-runtime");
const S_CIRCLE_INNER = {
    ...(0, _styleFn.crAbsoluteTopLeftStyle)(0, 0),
    width: 12,
    height: 12,
    overflow: 'visible'
  },
  S_CIRCLE_INNER_EL = {
    ...(0, _styleFn.crAbsoluteTopLeftStyle)(-12, -12),
    width: '300%',
    height: 36,
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 188, 212, 0.16)'
  };
const CircleInner = _ref => {
  let {
    is,
    circleStyle,
    emberStyle
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: {
      ...S_CIRCLE_INNER,
      ...circleStyle
    },
    children: is ? /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
      style: {
        ...S_CIRCLE_INNER_EL,
        ...emberStyle
      }
    }) : null
  });
};
var _default = exports.default = CircleInner;
//# sourceMappingURL=CircleInner.js.map