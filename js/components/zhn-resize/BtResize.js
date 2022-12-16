"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _Svg = _interopRequireDefault(require("../zhn/svg/Svg100"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_BT_RESIZE = "bt-resize not-selected";
const BtResize = _ref => {
  let {
    style,
    title,
    startResize,
    stopResize,
    onKeyDown
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    type: "button",
    className: CL_BT_RESIZE,
    style: style,
    title: title,
    onMouseDown: startResize,
    onMouseUp: stopResize,
    onKeyDown: onKeyDown,
    onTouchStart: startResize,
    onTouchEnd: stopResize,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Svg.default, {
      w: "12",
      strokeWidth: "2",
      strokeLinecap: "round",
      fill: "none",
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        d: "M 1,6 L 11,6"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        d: "M 6,2 L 1,6 6,10"
      })]
    })
  });
};
var _default = BtResize;
exports.default = _default;
//# sourceMappingURL=BtResize.js.map