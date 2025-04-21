"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.crToolbarButton = exports.ToolbarButtonCircle = void 0;
var _styleFn = require("../styleFn");
var _ButtonCircle = _interopRequireDefault(require("./ButtonCircle"));
var _jsxRuntime = require("react/jsx-runtime");
const S_TOOLBAR = {
  ..._styleFn.S_FLEX,
  padding: '6px 5px 6px 15px',
  gap: 15
};
const crToolbarButton = (caption, title, onClick) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonCircle.default, {
  caption: caption,
  title: title,
  onClick: onClick
}, caption);
exports.crToolbarButton = crToolbarButton;
const ToolbarButtonCircle = _ref => {
  let {
    style,
    children
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: {
      ...S_TOOLBAR,
      ...style
    },
    role: "toolbar",
    children: children
  });
};
exports.ToolbarButtonCircle = ToolbarButtonCircle;
//# sourceMappingURL=ToolbarButtonCircle.js.map