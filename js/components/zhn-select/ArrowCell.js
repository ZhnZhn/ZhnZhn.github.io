"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _CL = require("./CL");
var _jsxRuntime = require("react/jsx-runtime");
const ANIMATION_CIRCLE = "circle infinite 1.25s linear",
  BORDER_COLOR = "#1b75bb transparent transparent";
const ArrowCell = (0, _uiApi.forwardRef)((_ref, ref) => {
  let {
    arrowStyle,
    onClick
  } = _ref;
  const _refArrowCell = (0, _uiApi.useRef)(),
    _refArrow = (0, _uiApi.useRef)();
  (0, _uiApi.useImperativeHandle)(ref, () => ({
    startAnimation: () => {
      (0, _uiApi.getRefElementStyle)(_refArrowCell).animation = ANIMATION_CIRCLE;
      (0, _uiApi.getRefElementStyle)(_refArrow).borderColor = BORDER_COLOR;
    },
    stopAnimation: () => {
      (0, _uiApi.getRefElementStyle)(_refArrowCell).animation = "";
    }
  }), []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    type: "button",
    ref: _refArrowCell,
    tabIndex: "-1",
    className: _CL.CL_BT_ARROW,
    onClick: onClick,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      ref: _refArrow,
      style: arrowStyle
    })
  });
});
var _default = ArrowCell;
exports.default = _default;
//# sourceMappingURL=ArrowCell.js.map