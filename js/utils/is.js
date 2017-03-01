'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var isFn = exports.isFn = function isFn(fn) {
  return typeof fn === 'function';
};

var isStrInArr = exports.isStrInArr = function isStrInArr(str) {
  return function (arr) {
    if (!Array.isArray(arr)) {
      return false;
    }
    var i = void 0,
        len = arr.length;
    for (i = 0; i < len; i++) {
      if (str === arr[i]) {
        return true;
      }
    }
    return false;
  };
};

var is = {
  fn: isFn,
  strInArr: isStrInArr
};

exports.default = is;
//# sourceMappingURL=is.js.map