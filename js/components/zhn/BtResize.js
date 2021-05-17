"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var CL_BT_RESIZE = "bt-resize not-selected";

var BtResize = function BtResize(_ref) {
  var style = _ref.style,
      title = _ref.title,
      startResize = _ref.startResize,
      stopResize = _ref.stopResize,
      onKeyDown = _ref.onKeyDown;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    className: CL_BT_RESIZE,
    style: style,
    title: title,
    onMouseDown: startResize,
    onMouseUp: stopResize,
    onKeyDown: onKeyDown,
    onTouchStart: startResize,
    onTouchEnd: stopResize,
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)("svg", {
      viewBox: "0 0 12 12",
      width: "100%",
      height: "100%",
      preserveAspectRatio: "none",
      xmlns: "http://www.w3.org/2000/svg",
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
exports["default"] = _default;
//# sourceMappingURL=BtResize.js.map