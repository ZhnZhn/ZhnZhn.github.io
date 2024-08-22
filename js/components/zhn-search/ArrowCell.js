"use strict";

exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _jsxRuntime = require("react/jsx-runtime");
const CL_BT = 'zhn-select__bt-arrow',
  S_ARROW_CELL = {
    top: 0
  };
const ArrowCell = _ref => {
  let {
    arrowStyle,
    tabIndex = "-1",
    onClick
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("button", {
    type: "button",
    tabIndex: tabIndex,
    className: CL_BT,
    style: S_ARROW_CELL,
    onClick: onClick,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: _styleFn.CL_TOGGLE_ARROW,
      style: arrowStyle
    })
  });
};
var _default = exports.default = ArrowCell;
//# sourceMappingURL=ArrowCell.js.map