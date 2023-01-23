"use strict";

exports.__esModule = true;
exports.default = void 0;
const pipe = function (initialValue) {
  for (var _len = arguments.length, fns = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    fns[_key - 1] = arguments[_key];
  }
  return fns.reduce((prevValue, fn) => fn(prevValue), initialValue);
};
var _default = pipe;
exports.default = _default;
//# sourceMappingURL=pipe.js.map