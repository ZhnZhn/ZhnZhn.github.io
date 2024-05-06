"use strict";

exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _fUseKey = require("../hooks/fUseKey");
var _jsxRuntime = require("react/jsx-runtime");
const CL_INPUT_COLOR = 'input-color';
const CellColor = _ref => {
  let {
    refEl,
    className,
    style,
    color,
    onClick,
    children
  } = _ref;
  const _cn = (0, _styleFn.crCn)(className, CL_INPUT_COLOR),
    _bgColorStyle = color ? {
      backgroundColor: color
    } : void 0,
    _onClick = onClick ? evt => onClick(color, evt) : void 0,
    _onKeyEnter = (0, _fUseKey.useKeyEnter)(_onClick, [_onClick]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    ref: refEl,
    tabIndex: "0",
    role: "button",
    className: _cn,
    style: {
      ...style,
      ..._bgColorStyle
    },
    onClick: _onClick,
    onKeyDown: _onKeyEnter,
    children: children
  });
};
var _default = exports.default = CellColor;
//# sourceMappingURL=CellColor.js.map