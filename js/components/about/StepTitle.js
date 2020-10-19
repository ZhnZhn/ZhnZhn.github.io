"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _jsxRuntime = require("react/jsx-runtime.js");

var _Step = _interopRequireDefault(require("./Step"));

var StepTitle = function StepTitle(_ref) {
  var step = _ref.step,
      title = _ref.title;
  return /*#__PURE__*/(0, _jsxRuntime.jsxs)("p", {
    children: [/*#__PURE__*/(0, _jsxRuntime.jsx)(_Step["default"], {
      step: step
    }), /*#__PURE__*/(0, _jsxRuntime.jsxs)("span", {
      children: ["\xA0", title, "."]
    })]
  });
};

var _default = StepTitle;
exports["default"] = _default;
//# sourceMappingURL=StepTitle.js.map