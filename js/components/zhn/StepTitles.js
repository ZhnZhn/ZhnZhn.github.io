"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _styleFn = require("../styleFn");
var _ItemStack = _interopRequireDefault(require("./ItemStack"));
var _jsxRuntime = require("react/jsx-runtime");
const CL_STEP = "step",
  S_PB_4 = {
    paddingBottom: 4
  };
const StepTitle = props => /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
  style: S_PB_4,
  children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
    className: CL_STEP,
    style: (0, _styleFn.crColorStyle)(props.color),
    children: props.step
  }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
    children: ["\xA0", props.title, "."]
  })]
});
const _crItem = (title, index, restProps) => /*#__PURE__*/(0, _jsxRuntime.jsx)(StepTitle, {
  color: restProps.color,
  step: index + 1,
  title: title
}, title);
const StepTitles = props => /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
  className: props.className,
  style: props.style,
  children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
    items: props.titles,
    crItem: _crItem,
    color: props.stepColor
  })
});
var _default = exports.default = StepTitles;
//# sourceMappingURL=StepTitles.js.map