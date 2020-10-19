"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _react = require("react");

var DF_ARE_EQUAL = function DF_ARE_EQUAL(prevProps, nextProps) {
  return prevProps.isShow === nextProps.isShow;
};

var crModalDialog = function crModalDialog(Comp, areEqual) {
  if (areEqual === void 0) {
    areEqual = DF_ARE_EQUAL;
  }

  return /*#__PURE__*/(0, _react.memo)(Comp, areEqual);
};

var _default = crModalDialog;
exports["default"] = _default;
//# sourceMappingURL=crModalDialog.js.map