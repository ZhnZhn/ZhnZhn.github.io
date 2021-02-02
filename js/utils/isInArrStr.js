"use strict";

exports.__esModule = true;
exports["default"] = void 0;
var _isArr = Array.isArray;

var isInArrStr = function isInArrStr(arr) {
  return function (str) {
    if (!_isArr(arr)) {
      return false;
    }

    var i;

    for (i = 0; i < arr.length; i++) {
      if (str === arr[i]) {
        return true;
      }
    }

    return false;
  };
};

var _default = isInArrStr;
exports["default"] = _default;
//# sourceMappingURL=isInArrStr.js.map