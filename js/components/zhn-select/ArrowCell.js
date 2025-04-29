"use strict";

exports.__esModule = true;
exports.default = void 0;
var _a11yFn = require("../a11yFn");
var _Svg = require("../zhn/svg/Svg");
var _CL = require("./CL");
var _jsxRuntime = require("react/jsx-runtime");
const S_SVG_OPEN = {
    color: "#1b75bb"
  },
  S_SVG_CLOSE = {
    color: "#858585"
  };
const ArrowCell = _ref => {
  let {
    isShowOption,
    labelId,
    controlsId,
    onClick
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    ...(0, _a11yFn.crAriaExpandedProps)(isShowOption, controlsId),
    "aria-labelledby": labelId,
    "aria-label": "Toggle suggestions",
    "aria-haspopup": "true",
    type: "button",
    tabIndex: "-1",
    className: _CL.CL_BT_ARROW,
    onClick: onClick,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_Svg.Svg, {
      w: "20",
      "aria-hidden": "true",
      focusable: "false",
      style: isShowOption ? S_SVG_OPEN : S_SVG_CLOSE,
      children: /*#__PURE__*/(0, _jsxRuntime.jsx)("path", {
        d: "M 3,6 L 10,12.5 M 10,12.5 L 17,6"
      })
    })
  });
};
var _default = exports.default = ArrowCell;
//# sourceMappingURL=ArrowCell.js.map