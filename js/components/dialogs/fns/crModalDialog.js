"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _areEqual = function _areEqual(prevProps, nextProps) {
  return prevProps.isShow === nextProps.isShow;
};

var crModalDialog = function crModalDialog(Comp, areEqual) {
  if (areEqual === void 0) {
    areEqual = _areEqual;
  }

  return /*#__PURE__*/_react["default"].memo(Comp, areEqual);
};

var _default = crModalDialog;
exports["default"] = _default;
//# sourceMappingURL=crModalDialog.js.map