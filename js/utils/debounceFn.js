"use strict";

exports.__esModule = true;
exports.default = void 0;
const debounceFn = (fn, period) => {
  let timeId = null;
  return function debounced() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (timeId) {
      clearTimeout(timeId);
    }
    timeId = setTimeout(() => {
      fn(...args);
      timeId = null;
    }, period);
    debounced.cancel = () => {
      clearTimeout(timeId);
    };
  };
};
var _default = exports.default = debounceFn;
//# sourceMappingURL=debounceFn.js.map