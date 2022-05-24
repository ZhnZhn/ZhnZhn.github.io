"use strict";

exports.__esModule = true;
exports.default = void 0;

var _react = require("react");

var _CL = require("./CL");

var _jsxRuntime = require("react/jsx-runtime");

const ANIMATION_CIRCLE = "circle infinite 1.25s linear",
      BORDER_COLOR = "#1b75bb transparent transparent";

const _getStyle = ref => ref.current.style;

const ArrowCell = /*#__PURE__*/(0, _react.forwardRef)((_ref, ref) => {
  let {
    arrowStyle,
    onClick
  } = _ref;

  const _refArrowCell = (0, _react.useRef)(),
        _refArrow = (0, _react.useRef)();

  (0, _react.useImperativeHandle)(ref, () => ({
    startAnimation: () => {
      _getStyle(_refArrowCell).animation = ANIMATION_CIRCLE;
      _getStyle(_refArrow).borderColor = BORDER_COLOR;
    },
    stopAnimation: () => {
      _getStyle(_refArrowCell).animation = "";
    }
  }), []);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    ref: _refArrowCell,
    className: _CL.CL_BT_ARROW,
    tabIndex: "-1",
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