"use strict";

exports.__esModule = true;
exports["default"] = safeFn;

function safeFn(obj, propName, dfValue) {
  if (!obj) {
    return function () {
      return dfValue;
    };
  }

  return typeof obj[propName] == 'function' ? obj[propName] : function () {
    return dfValue;
  };
}
//# sourceMappingURL=safeFn.js.map