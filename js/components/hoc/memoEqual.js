"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = require("react");

var DF_ARE_EQUAL_PROPS = function DF_ARE_EQUAL_PROPS() {};

var memoEqual = function memoEqual(Element, areEqualProps) {
  if (areEqualProps === void 0) {
    areEqualProps = DF_ARE_EQUAL_PROPS;
  }

  return /*#__PURE__*/(0, _react.memo)(Element, areEqualProps);
};

var _default = memoEqual;
exports["default"] = _default;
//# sourceMappingURL=memoEqual.js.map