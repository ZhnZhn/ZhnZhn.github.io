"use strict";

exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _InputSelectFn = require("./InputSelectFn");
var _CL = require("./CL");
var _jsxRuntime = require("react/jsx-runtime");
const ANIMATION_CIRCLE = "circle infinite 1.25s linear",
  ARROW_BORDER_COLOR = "#1b75bb transparent transparent",
  S_ARROW_SHOW = {
    borderColor: ARROW_BORDER_COLOR
  };
const ArrowCell = (0, _uiApi.forwardRef)((_ref, ref) => {
  let {
    isShowOption,
    labelId,
    controlsId,
    onClick
  } = _ref;
  const _arrowStyle = isShowOption ? S_ARROW_SHOW : void 0,
    _refArrowCell = (0, _uiApi.useRef)(),
    _refArrow = (0, _uiApi.useRef)();
  (0, _uiApi.useImperativeHandle)(ref, () => ({
    startAnimation: () => {
      (0, _uiApi.getRefElementStyle)(_refArrowCell).animation = ANIMATION_CIRCLE;
      (0, _uiApi.getRefElementStyle)(_refArrow).borderColor = ARROW_BORDER_COLOR;
    },
    stopAnimation: () => {
      (0, _uiApi.getRefElementStyle)(_refArrowCell).animation = "";
    }
  }), []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    ...(0, _InputSelectFn.crAriaExpandedProps)(isShowOption, controlsId),
    "aria-labelledby": labelId,
    "aria-label": "Toggle suggestions",
    "aria-haspopup": "true",
    type: "button",
    ref: _refArrowCell,
    tabIndex: "-1",
    className: _CL.CL_BT_ARROW,
    onClick: onClick,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      ref: _refArrow,
      style: _arrowStyle
    })
  });
});
var _default = exports.default = ArrowCell;
//# sourceMappingURL=ArrowCell.js.map