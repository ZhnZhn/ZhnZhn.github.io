"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var _isFn = function _isFn(fn) {
  return typeof fn === 'function';
};

var focusNode = function focusNode(n) {
  if (n && _isFn(n.focus)) {
    n.focus();
  }
};

var _default = focusNode;
exports["default"] = _default;
//# sourceMappingURL=focusNode.js.map