"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _react = _interopRequireDefault(require("react"));

var _A = _interopRequireDefault(require("../zhn/A"));

var S = {
  CAPTION: {
    display: 'inline-block',
    color: 'black',
    paddingRight: 8,
    paddingBottom: 6,
    fontWeight: 'bold'
  }
};

var RowPlusMinus = function RowPlusMinus(_ref) {
  var is = _ref.is,
      styleCaption = _ref.styleCaption,
      caption = _ref.caption,
      onMinus = _ref.onMinus,
      onPlus = _ref.onPlus;
  return _react["default"].createElement("div", null, _react["default"].createElement("span", {
    style: (0, _extends2["default"])({}, S.CAPTION, {}, styleCaption)
  }, caption), is ? _react["default"].createElement(_A["default"].SvgMinus, {
    onClick: onMinus
  }) : _react["default"].createElement(_A["default"].SvgPlus, {
    onClick: onPlus
  }));
};

var _default = RowPlusMinus;
exports["default"] = _default;
//# sourceMappingURL=RowPlusMinus.js.map