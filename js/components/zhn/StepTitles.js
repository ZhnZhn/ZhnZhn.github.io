"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
exports.__esModule = true;
exports.default = void 0;
var _ItemStack = _interopRequireDefault(require("./ItemStack"));
var _StepTitle = _interopRequireDefault(require("./StepTitle"));
var _react = require("react");
var _jsxRuntime = require("react/jsx-runtime");
const _crItem = (title, index, restProps) => /*#__PURE__*/(0, _react.createElement)(_StepTitle.default, {
  ...restProps,
  key: title,
  step: index + 1,
  title: title
});
const StepTitles = _ref => {
  let {
    style,
    stepStyle,
    titles
  } = _ref;
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("div", {
    style: style,
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)(_ItemStack.default, {
      items: titles,
      crItem: _crItem,
      stepStyle: stepStyle
    })
  });
};
var _default = exports.default = StepTitles;
//# sourceMappingURL=StepTitles.js.map