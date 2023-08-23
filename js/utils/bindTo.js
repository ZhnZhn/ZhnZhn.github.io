"use strict";

exports.__esModule = true;
exports.bindTo = void 0;
const bindTo = function (fn) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  return fn.bind(null, ...args);
};
exports.bindTo = bindTo;
//# sourceMappingURL=bindTo.js.map