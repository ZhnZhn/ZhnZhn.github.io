"use strict";

exports.__esModule = true;
exports.default = void 0;
var _InputSelectFn = require("./InputSelectFn");
var _CL = require("./CL");
var _jsxRuntime = require("react/jsx-runtime");
const ARROW_BORDER_COLOR = "#1b75bb transparent transparent",
  S_ARROW_SHOW = {
    borderColor: ARROW_BORDER_COLOR
  };
const ArrowCell = _ref => {
  let {
    isShowOption,
    labelId,
    controlsId,
    onClick
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    ...(0, _InputSelectFn.crAriaExpandedProps)(isShowOption, controlsId),
    "aria-labelledby": labelId,
    "aria-label": "Toggle suggestions",
    "aria-haspopup": "true",
    type: "button",
    tabIndex: "-1",
    className: _CL.CL_BT_ARROW,
    onClick: onClick,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: isShowOption ? S_ARROW_SHOW : void 0
    })
  });
};
var _default = exports.default = ArrowCell;
//# sourceMappingURL=ArrowCell.js.map