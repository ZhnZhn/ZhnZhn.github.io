"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _Step = _interopRequireDefault(require("./Step"));

var StepTitle = function StepTitle(_ref) {
  var step = _ref.step,
      title = _ref.title;
  return /*#__PURE__*/_react["default"].createElement("p", null, /*#__PURE__*/_react["default"].createElement(_Step["default"], {
    step: step
  }), /*#__PURE__*/_react["default"].createElement("span", null, "\xA0", title, "."));
};

var _default = StepTitle;
exports["default"] = _default;
//# sourceMappingURL=StepTitle.js.map