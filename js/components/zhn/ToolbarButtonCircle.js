"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.crToolbarButton = exports.ToolbarButtonCircle = void 0;
var _ButtonCircle = _interopRequireDefault(require("./ButtonCircle"));
var _jsxRuntime = require("react/jsx-runtime");
const S_TOOLBAR = {
    display: 'flex',
    alignItems: 'center',
    padding: '6px 5px'
  },
  S_BUTTON_CIRCLE = {
    marginLeft: 20
  };
const crToolbarButton = (caption, title, onClick) => /*#__PURE__*/(0, _jsxRuntime.jsx)(_ButtonCircle.default, {
  style: S_BUTTON_CIRCLE,
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