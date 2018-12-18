'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isFn = exports.isFn = function isFn(fn) {
  return typeof fn === 'function';
};

var isKeyEscape = exports.isKeyEscape = function isKeyEscape(evt) {
  return evt.keyCode === 27 || evt.key === 'Escape';
};

var focusNode = exports.focusNode = function focusNode(n) {
  if (n && isFn(n.focus)) {
    n.focus();
  }
};

var utils = {
  isFn: isFn,
  isKeyEscape: isKeyEscape,
  focusNode: focusNode
};

exports.default = utils;
//# sourceMappingURL=utils.js.map