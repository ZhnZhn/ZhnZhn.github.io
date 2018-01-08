'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = safeFn;
function safeFn(obj, propName, dfValue) {
  if (!obj) {
    return function () {
      return dfValue;
    };
  }

  if (typeof obj[propName] == 'function') {
    return obj[propName];
  } else {
    return function () {
      return dfValue;
    };
  }
}
//# sourceMappingURL=safeFn.js.map