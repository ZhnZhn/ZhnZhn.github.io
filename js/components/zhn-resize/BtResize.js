"use strict";

exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _Svg = require("../zhn/svg/Svg");
var _jsxRuntime = require("react/jsx-runtime");
const CL_BT_RESIZE = (0, _styleFn.crNotSelectedCn)("bt-resize");
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
    children: /*#__PURE__*/(0, _jsxRuntime.jsxs)(_Svg.Svg100, {
      w: "12",
      ..._Svg.STROKE_LINECAP_ROUND_PROPS,
      fill: _Svg.FILL_NONE,
      children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        d: "M 1,6 L 11,6"
      }), /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        d: "M 6,2 L 1,6 6,10"
      })]
    })
  });
};
var _default = exports.default = BtResize;
//# sourceMappingURL=BtResize.js.map