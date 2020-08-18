"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var memoEqual = function memoEqual(Element, areEqualProps) {
  if (areEqualProps === void 0) {
    areEqualProps = function areEqualProps() {
      return true;
    };
  }

  return /*#__PURE__*/_react["default"].memo(Element, areEqualProps);
};

var _default = memoEqual;
exports["default"] = _default;
//# sourceMappingURL=memoEqual.js.map