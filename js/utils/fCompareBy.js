"use strict";

exports.__esModule = true;
exports["default"] = void 0;

var fCompareBy = function fCompareBy(by) {
  return function (arrOrObjA, arrOrObjB) {
    if (arrOrObjA[by] < arrOrObjB[by]) return -1;else if (arrOrObjA[by] === arrOrObjB[by]) return 0;else return 1;
  };
};

var _default = fCompareBy;
exports["default"] = _default;
//# sourceMappingURL=fCompareBy.js.map