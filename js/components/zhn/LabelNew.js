"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var S = {
  LABEL: {
    display: 'inline-block',
    color: '#9E9E9E',
    backgroundColor: 'transparent',
    marginLeft: '16px',
    marginRight: '16px'
  }
};

var LabelNew = function LabelNew() {
  return _react["default"].createElement("span", {
    style: S.LABEL
  }, "New");
};

var _default = LabelNew;
exports["default"] = _default;
//# sourceMappingURL=LabelNew.js.map