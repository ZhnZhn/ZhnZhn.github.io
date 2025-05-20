"use strict";

exports.__esModule = true;
exports.fNegate = exports.fCompareBy = void 0;
const fNegate = fn => function () {
  return -1 * fn(...arguments);
};
exports.fNegate = fNegate;
const _isNaN = Number.isNaN;
const _compareMaybeNaN = (v1, v2) => _isNaN(v1) ? _isNaN(v2) ? 0 : 1 : _isNaN(v2) ? -1 : 2;
const _compareValue = (v1, v2) => v1 < v2 ? 1 : v1 > v2 ? -1 : 0;
const _compareNumber = (v1, v2) => {
  const _r = _compareMaybeNaN(v1, v2);
  return _r === 2 ? _compareValue(v1, v2) : _r;
};
const fCompareBy = (TOKEN_NAN, pn) => (a, b) => {
  const v1 = a[pn],
    v2 = b[pn];
  return typeof v1 === 'number' || v1 === TOKEN_NAN ? _compareNumber(v1, v2) : _compareValue(v1, v2);
};
exports.fCompareBy = fCompareBy;
//# sourceMappingURL=compareFactory.js.map