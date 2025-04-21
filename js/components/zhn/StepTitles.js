"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ItemStack = _interopRequireDefault(require("./ItemStack"));
var _jsxRuntime = require("react/jsx-runtime");
var _react = require("react");
const CL_STEP = "step",
  S_PB_4 = {
    paddingBottom: 4
  };
const StepTitle = _ref => {
  let {
    step,
    stepColor,
    title
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
    style: S_PB_4,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      className: CL_STEP,
      style: {
        color: stepColor
      },
      children: step
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      children: ["\xA0", title, "."]
    })]
  });
};
const _crItem = (title, index, restProps) => /*#__PURE__*/(0, _react.createElement)(StepTitle, {
  ...restProps,
  key: title,
  step: index + 1,
  title: title
});
const StepTitles = _ref2 => {
  let {
    className,
    style,
    stepColor,
    titles
  } = _ref2;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    className: className,
    style: style,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
      items: titles,
      crItem: _crItem,
      stepColor: stepColor
    })
  });
};
var _default = exports.default = StepTitles;
//# sourceMappingURL=StepTitles.js.map