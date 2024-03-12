"use strict";

exports.__esModule = true;
exports.default = void 0;
var _jsxRuntime = require("react/jsx-runtime");
const S_PB_4 = {
  paddingBottom: 4
};
const StepTitle = _ref => {
  let {
    step,
    stepStyle,
    title
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
    style: S_PB_4,
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)("span", {
      style: stepStyle,
      children: step
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      children: ["\xA0", title, "."]
    })]
  });
};
var _default = exports.default = StepTitle;
//# sourceMappingURL=StepTitle.js.map