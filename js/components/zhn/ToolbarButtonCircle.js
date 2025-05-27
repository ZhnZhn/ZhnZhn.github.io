"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.crToolbarButton = exports.ToolbarButtonSvg = exports.ToolbarButtonCircle = void 0;
var _styleFn = require("../styleFn");
var _ButtonCircle = _interopRequireDefault(require("./ButtonCircle"));
var _jsxRuntime = require("react/jsx-runtime");
const S_SVG_TOOLBAR = {
  ..._styleFn.S_FLEX,
  padding: 6,
  gap: 6
};
const S_BT_TOOLBAR = {
  ..._styleFn.S_FLEX,
  padding: "6px 5px 6px 15px",
  gap: 15
};
const crToolbarButton = (caption, title, onClick) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonCircle.default, {
  caption: caption,
  title: title,
  onClick: onClick
}, caption);
exports.crToolbarButton = crToolbarButton;
const _fToolbar = style => props => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
  style: {
    ...style,
    ...props.style
  },
  role: "toolbar",
  children: props.children
});
const ToolbarButtonSvg = exports.ToolbarButtonSvg = _fToolbar(S_SVG_TOOLBAR);
const ToolbarButtonCircle = exports.ToolbarButtonCircle = _fToolbar(S_BT_TOOLBAR);
//# sourceMappingURL=ToolbarButtonCircle.js.map