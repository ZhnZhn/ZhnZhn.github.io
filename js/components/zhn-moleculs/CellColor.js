"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _uiApi = require("../uiApi");
var _styleFn = require("../styleFn");
var _useKeyEnter = _interopRequireDefault(require("../hooks/useKeyEnter"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_INPUT_COLOR = 'input-color';
const CellColor = (0, _uiApi.forwardRef)((_ref, ref) => {
  let {
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
    _onKeyEnter = (0, _useKeyEnter.default)(_onClick, [_onClick]);
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    ref: ref,
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
});
var _default = CellColor;
exports.default = _default;
//# sourceMappingURL=CellColor.js.map