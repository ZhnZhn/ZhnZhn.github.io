"use strict";

exports.__esModule = true;
exports.default = void 0;
var _a11yFn = require("../a11yFn");
var _styleFn = require("../styleFn");
var _Svg = require("../zhn/svg/Svg");
var _CL = require("./CL");
var _jsxRuntime = require("react/jsx-runtime");
const S_SVG_OPEN = (0, _styleFn.crColorStyle)(_CL.COLOR_OPTIONS_OPEN),
  S_SVG_CLOSE = (0, _styleFn.crColorStyle)(_CL.COLOR_OPTIONS_CLOSE);
const ArrowCell = ({
  isShowOption,
  labelId,
  controlsId,
  onClick
}) => /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
  ...(0, _a11yFn.crAriaExpandedProps)(isShowOption, controlsId),
  "aria-labelledby": labelId,
  "aria-label": "Toggle suggestions",
  "aria-haspopup": "true",
  type: "button",
  tabIndex: "-1",
  className: _CL.CL_BT_ARROW,
  onClick: onClick,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.SvgArrowDown, {
    style: isShowOption ? S_SVG_OPEN : S_SVG_CLOSE
  })
});
var _default = exports.default = ArrowCell;
//# sourceMappingURL=ArrowCell.js.map