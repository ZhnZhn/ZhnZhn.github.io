"use strict";

exports.__esModule = true;
exports["default"] = exports.focusNode = exports.isKeyEscape = exports.isFn = void 0;

var isFn = function isFn(fn) {
  return typeof fn === 'function';
};

exports.isFn = isFn;

var isKeyEscape = function isKeyEscape(evt) {
  return evt.keyCode === 27 || evt.key === 'Escape';
};

exports.isKeyEscape = isKeyEscape;

var focusNode = function focusNode(n) {
  if (n && isFn(n.focus)) {
    n.focus();
  }
};

exports.focusNode = focusNode;
var utils = {
  isFn: isFn,
  isKeyEscape: isKeyEscape,
  focusNode: focusNode
};
var _default = utils;
exports["default"] = _default;
//# sourceMappingURL=utils.js.map