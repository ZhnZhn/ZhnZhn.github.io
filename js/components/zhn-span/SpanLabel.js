"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var STYLE = {
  ROOT: {
    color: '#1b75bb',
    fontSize: '16px',
    fontWeight: 'bold'
  }
};

var SpanLabel = function SpanLabel(_ref) {
  var label = _ref.label,
      style = _ref.style;
  return _react["default"].createElement("span", {
    style: (0, _extends2["default"])({}, STYLE.ROOT, {}, style)
  }, label);
};

var _default = SpanLabel;
exports["default"] = _default;
//# sourceMappingURL=SpanLabel.js.map