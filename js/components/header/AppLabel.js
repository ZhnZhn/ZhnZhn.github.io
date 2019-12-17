"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var AppLabel = function AppLabel(_ref) {
  var className = _ref.className,
      caption = _ref.caption,
      title = _ref.title;
  return _react["default"].createElement("span", {
    className: className,
    title: title
  }, caption);
};

var _default = AppLabel;
exports["default"] = _default;
//# sourceMappingURL=AppLabel.js.map