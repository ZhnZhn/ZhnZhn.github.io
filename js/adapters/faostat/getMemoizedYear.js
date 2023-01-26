"use strict";

exports.__esModule = true;
exports.default = void 0;
let _memoized_year;
const _crYear = () => {
    const year = new Date().getUTCFullYear(),
      arr = [];
    let i = 1980;
    for (; i < year; i++) {
      arr.push(i);
    }
    return _memoized_year = arr.join(',');
  },
  getMemoizedYear = () => _memoized_year || _crYear();
var _default = getMemoizedYear;
exports.default = _default;
//# sourceMappingURL=getMemoizedYear.js.map