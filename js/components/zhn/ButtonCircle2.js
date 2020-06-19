"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var CL = 'zhn-bt-circle2';

var ButtonCircle2 = function ButtonCircle2(_ref) {
  var tabIndex = _ref.tabIndex,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? '' : _ref$className,
      style = _ref.style,
      dataLoader = _ref.dataLoader,
      _ref$caption = _ref.caption,
      caption = _ref$caption === void 0 ? '' : _ref$caption,
      onClick = _ref.onClick;
  return /*#__PURE__*/_react["default"].createElement("button", {
    tabIndex: tabIndex,
    className: CL + " " + className,
    style: style,
    onClick: onClick,
    "data-loader": dataLoader
  }, /*#__PURE__*/_react["default"].createElement("div", null, caption));
};

var _default = ButtonCircle2;
exports["default"] = _default;
//# sourceMappingURL=ButtonCircle2.js.map